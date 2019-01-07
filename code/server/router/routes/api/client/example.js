export default router => {
    router.get('/examples', $app.controller.client.example.getExamples),
    router.get('/download_example/:id', $app.controller.client.example.downloadExamole)
}