export default router => {
    router.get('/leave_messages', $app.controller.client.leave_message.getLeaveMessages)
    router.patch('/leave_messages/:id', $app.controller.client.leave_message.updateLeaveMessage)
    router.post('/leave_messages', $app.controller.client.leave_message.addLeaveMessage)
}