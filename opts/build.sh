#!/bin/bash

DOCKER_REGISTRY=$1
DOCKER_PREFIX=$2

admin_image=$(head -n 1 .admin-images)
client_image=$(head -n 1 .client-images)
server_image=$(head -n 1 .server-images)

if [ -z "$admin_image" ]; then
  echo "admin镜像不能为空"
  exit 1
fi

if [ -z "$client_image" ]; then
  echo "client镜像不能为空"
  exit 1
fi

if [ -z "$server_image" ]; then
  echo "server镜像不能为空"
  exit 1
fi


send_curl_request() {
    local url="$1"
    local max_retries="$2"
    local retry_interval="${3:-1}"
    local retry_count=0
    echo "health check url: $url"

    until [ $retry_count -ge $max_retries ]
    do
        # 发送 curl 请求
        curl_output=$(curl --output /dev/null --silent --head --fail "$url")

        # 检查 curl 请求是否成功
        if [ $? -eq 0 ]; then
            echo "$url is available."
            # 请求成功，退出循环
            return 0
        else
            # 请求失败，增加重试次数
            retry_count=$((retry_count+1))
            # 输出重试信息
            echo "Retrying... Attempt $retry_count"
            # 等待
            sleep "$retry_interval"
        fi
    done

    # 达到最大重试次数，返回失败
    return 1
}

username=$(cat .docker-username)
cat .docker-password | docker login ${DOCKER_REGISTRY} -u ${username} --password-stdin


if [ -f ".env.runtime" ]; then
  rm .env.runtime
fi
touch .env.runtime
echo "ADMIN_IMAGE=${DOCKER_PREFIX}${admin_image}" >> ".env.runtime"
echo "CLIENT_IMAGE=${DOCKER_PREFIX}${client_image}" >> ".env.runtime"
echo "SERVER_IMAGE=${DOCKER_PREFIX}${server_image}" >> ".env.runtime"

if [ -f ".env.runtime" ]; then
  COMPOSE_COMMAND="$COMPOSE_COMMAND --env-file .env.runtime"
fi
if [ -f ".env.default" ]; then
  COMPOSE_COMMAND="$COMPOSE_COMMAND --env-file .env.default"
fi
if [ -f ".env.prod" ]; then
  COMPOSE_COMMAND="$COMPOSE_COMMAND --env-file .env.prod"
fi

echo "docker compose ${COMPOSE_COMMAND} up -d db"
docker compose ${COMPOSE_COMMAND} up -d db
# 等待 db 服务启动完成，重试最多10次
retry_count=0
until docker compose exec ${COMPOSE_COMMAND} db mysqladmin ping -hlocalhost &> /dev/null || [ $retry_count -eq 10 ]; do
    printf '.'
    retry_count=$((retry_count+1))
    sleep 1
done

# 检查是否达到了最大重试次数
if [ $retry_count -eq 10 ]; then
    # 达到最大重试次数，输出错误信息
    echo "Failed to start database service."
    exit 1
fi

echo "docker compose ${COMPOSE_COMMAND} up -d server"
docker compose ${COMPOSE_COMMAND} up -d server


# 等待 server 服务健康状态，重试最多10次
if ! send_curl_request "http://localhost:${SERVER_PORT}/api/health-check" 50; then
    echo "Failed to start server service."
    exit 1
fi

echo "docker compose ${COMPOSE_COMMAND} up -d client || exit 1;docker compose ${COMPOSE_COMMAND} up -d admin || exit 1"
docker compose ${COMPOSE_COMMAND} up -d client || exit 1;docker compose ${COMPOSE_COMMAND} up -d admin || exit 1


if ! send_curl_request "http://localhost:${CLIENT_PORT}/apis/health-check" 200 6; then
    echo "Failed to start client service."
    exit 1
fi

echo "所有服务启动完毕."
echo "开始删除旧有镜像"

cleanup_images() {
  file="$1"
  echo "$file"
  if [ -e "$file" ]; then
    echo "($file)：清除文件镜像记录，保留最近2个镜像"
    tail -n +3 "$file" | while IFS= read -r line; do
      echo "镜像id: $DOCKER_PREFIX$line 删除中....."
      docker rmi "$DOCKER_PREFIX$line" > /dev/null 2>&1
    done
    echo "$(head -n 2 "$file")" > "$file"
    echo "($file)：清除成功"
  else
    echo "文件 $file 不存在，跳过操作。"
  fi
}

cleanup_images ".admin-images"
cleanup_images ".client-images"
cleanup_images ".server-images"

docker logout ${DOCKER_REGISTRY}