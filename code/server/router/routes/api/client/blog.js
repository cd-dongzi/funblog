export default router => {
    router.get('/blogs', $app.controller.client.blog.getBlogs)
    router.get('/blogs/:id', $app.controller.client.blog.getBlogInfo)
    router.get('/reading_num/:id', $app.controller.client.blog.addBlogReadingNum)
}