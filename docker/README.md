## 执行启动命令

`docker compose --env-file ../.env.default up -d`


1. 进入`http://localhost:8003/register` 基于.env.default中的邀请码进行账号注册
2. 登录之后进入`http://localhost:8003/init` 进行数据初始化
3. 访问 `http://localhost:8002` 便可展示初始数据