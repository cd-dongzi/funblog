export default router => {
    router.post('/markdown/img', $app.controller.admin.markdown.addImg)
}