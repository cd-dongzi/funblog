export default router => {
    router.get('/blog/tabs', $app.controller.admin.blogTab.getBlogTabs)
    router.post('/blog/tabs', $app.controller.admin.blogTab.addBlogTab)
    router.patch('/blog/tabs/:id', $app.controller.admin.blogTab.updateBlogTab)
    router.delete('/blog/tabs/:id', $app.controller.admin.blogTab.delBlogTab)
}