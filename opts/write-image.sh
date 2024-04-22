#!/bin/bash
# 获取文件路径和写入内容
file_path=$1
content=$2


# 检查参数是否完整
if [ -z "${file_path}" ] || [ -z "${content}" ]; then
  echo "请提供完整参数！"
  exit 1
fi

new_data="${content}\n"

if [ -f "$file_path" ]; then
  existing_data=$(cat $file_path)
  new_data="${content}\n${existing_data}"
fi

# 写入内容到文件
echo "$new_data" > "$file_path"
if [ $? -eq 0 ]; then
  echo "内容已成功写入到文件中！"
else
  echo "写入文件时发生错误！"
fi
