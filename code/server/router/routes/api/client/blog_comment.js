export default router => {
    router.get('/blog_comments', $app.controller.client.blog_comment.getBlogComments)
    router.patch('/blog_comments/:id', $app.controller.client.blog_comment.updateBlogComment)
    router.post('/blog_comments', $app.controller.client.blog_comment.addBlogComment)
}