export default router => {
    router.get('/examples/:id', $app.controller.admin.example.getExampleInfo)
    router.get('/examples', $app.controller.admin.example.getExamples)
    router.post('/examples/:type', $app.controller.admin.example.addExample)
    router.patch('/examples/:type/:id', $app.controller.admin.example.updateExample)
    router.delete('/examples/:id', $app.controller.admin.example.delExample)
}