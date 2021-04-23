## 博客源码

[在线地址](https://dzblog.cn/)

## 项目使用

1. 确保你的`node`版本在`10.13.0 (LTS)`以上，因为`Webpack 5` 对 `Node.js` 的版本要求至少是 `10.13.0 (LTS)`
2. 确保本地安装了`Mongodb`
3. 如果启动`https`,确保下载了证书。`/src/shared/config/index.ts`文件里面开启https。证书下载到`src/server/ssl`文件夹下。如何创建证书，参考此文章: [搭建Node.js本地https服务](https://heara.in/nodejs-localhost-https/)
4. 启动项目会没有数据，所以最好先创建一些数据
6. 启动项目后，调用接口`https://localhost:3000/update/userSystem`来生成一个用户,用户名: `admin`, 密码：`123456`
  
  ```typescript
  // 创建用户
  router.get('/update/userSystem', async (ctx: any, next: any) => {
    await UserSystemModel.create({
      name: '终结者',
      password: md5('123456'),
      username: 'admin',
      roles: ['admin'],
      github: 'https://github.com/cd-dongzi'
    })
    ctx.send('ok')
  })
  ```
7. 进入后台创建几篇文章，用于展示。
8. 进入前端看展示效果。
9. 至此，项目展示完成。
10. git 提交有hook拦截校验，可以使用npm commit 来提交。或者全局下载`cz-customizable`来通过`git cz`全局使用。