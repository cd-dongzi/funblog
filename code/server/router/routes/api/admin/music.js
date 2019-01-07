export default router => {
    router.get('/musics/:id', $app.controller.admin.music.getMusicInfo)
    router.get('/musics', $app.controller.admin.music.getMusics)
    router.post('/musics', $app.controller.admin.music.addMusic)
    router.patch('/musics/:id', $app.controller.admin.music.updateMusic)
    router.delete('/musics/:id', $app.controller.admin.music.delMusic)
}