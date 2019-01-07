export default router => {
    router.post('/login', $app.controller.admin.user.login)
    router.get('/users/:token', $app.controller.admin.user.getUserInfo)
    router.get('/users', $app.controller.admin.user.getUsers)
    router.post('/users', $app.controller.admin.user.addUser)
    router.patch('/users/:id', $app.controller.admin.user.updateUser)
    router.delete('/users/:id', $app.controller.admin.user.delUser)
}