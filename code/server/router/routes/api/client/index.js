import koaRouter from 'koa-router'
import blogApi from './blog'
import blogTabApi from './blogTab'
import musicApi from './music'
import musicTabApi from './musicTab'
import exampleApi from './example'
import messageApi from './message'
import barrageApi from './barrage'
import archivingApi from './archiving'
import blogCommentApi from './blog_comment'
import leaveMessageApi from './leave_message'
import visitorApi from './visitor'
const router = koaRouter()
// 博客
blogApi(router)
// 博客标签
blogTabApi(router)
// 音乐
musicApi(router)
// 音乐标签
musicTabApi(router)
// 示例
exampleApi(router)
// 留言板
messageApi(router)
// 弹幕
barrageApi(router)
// 归档
archivingApi(router)
// 博客留言
blogCommentApi(router)
// 留言
leaveMessageApi(router)
// 游客信息
visitorApi(router)
export default router