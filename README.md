## 本地启动

1. 开启Mysql数据/ 创建.env.default中对应的账号密码

2. 初始化数据库
- `pnpm run prisma:dev`

3. 启动项目 
- `pnpm run dev`

- `http://localhost:8001` => server
- `http://localhost:8002` => client
- `http://localhost:8003` => admin

## docker启动
进入docker目录， 执行`docker compose --env-file ../.env.default up -d`


## docker 本地启动
`pnpm run docker:compose`


## 数据初始化


1. 进入`http://localhost:8003/register` 基于.env.default中的邀请码进行账号注册
2. 登录之后进入`http://localhost:8003/init` 进行数据初始化
3. 访问 `http://localhost:8002` 便可展示初始数据


