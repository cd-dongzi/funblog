export default router => {
    router.get('/archiving', $app.controller.client.archiving.getArchiving)
}