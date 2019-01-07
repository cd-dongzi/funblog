export default router => {
    router.get('/barrages', $app.controller.client.barrage.getBarrages)
    router.post('/barrages', $app.controller.client.barrage.addBarrage)
}