export default router => {
    router.get('/visitors', $app.controller.client.visitor.getVisitors)
    router.post('/visitors', $app.controller.client.visitor.addVisitor)
}