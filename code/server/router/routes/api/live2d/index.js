import koaRouter from 'koa-router'
const router = koaRouter()
router.get('/:modelType/model', $app.controller.client.live2d.index.changeModel)
router.get('/:texturesType/textures', $app.controller.client.live2d.index.changeTextures)
router.get('/model/:modelId/textures/:texturesId', $app.controller.client.live2d.index.loadLive2d)

export default router