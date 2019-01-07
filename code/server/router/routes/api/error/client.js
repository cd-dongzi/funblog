export default router => {
    // router.get('/blog/tabs', $app.controller.client.blogTab.getBlogTabs)
    router.post('/global', $app.controller.client.error.captureGlobal)
}