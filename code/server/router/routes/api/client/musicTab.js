export default router => {
    router.get('/music/tabs', $app.controller.client.musicTab.getMusicTabs)
}