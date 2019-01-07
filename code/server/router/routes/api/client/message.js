export default router => {
    router.get('/messages', $app.controller.client.message.getMessages)
    router.post('/messages', $app.controller.client.message.addMessage)
}