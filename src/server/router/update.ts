import { UserSystemModel } from '@server/models/userSystem'
import md5 from 'md5'

// 创建用户
const updateUserSystem = async () => {
  await UserSystemModel.create({
    name: '终结者',
    password: md5('123456'),
    username: 'admin',
    roles: ['admin'],
    github: 'https://github.com/cd-dongzi'
  })
}

export default (router: any) => {
  router.get('/update/userSystem', async (ctx: any, next: any) => {
    await updateUserSystem()
    ctx.send('ok')
  })
}
