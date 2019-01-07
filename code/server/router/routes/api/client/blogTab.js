export default router => {
    router.get('/blog/tabs', $app.controller.client.blogTab.getBlogTabs)
}