export default router => {
    router.get('/blogs', $app.controller.admin.blog.getBlogs)
    router.post('/blogs', $app.controller.admin.blog.addBlog)
    router.patch('/blogs/:id', $app.controller.admin.blog.updateBlog)
    router.delete('/blogs/:id', $app.controller.admin.blog.delBlog)
}