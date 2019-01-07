import koaRouter from 'koa-router'
const router = koaRouter()
router.get('/get_blogtab_count', $app.controller.client.utils.getBlogTabCount)
router.get('/get_musictab_count', $app.controller.client.utils.getMusicTabCount)
export default router