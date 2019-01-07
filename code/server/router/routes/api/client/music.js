export default router => {
    router.get('/musics', $app.controller.client.music.getMusics)
    router.get('/musics/random', $app.controller.client.music.getRandomMusics)
    router.get('/musics/random_info', $app.controller.client.music.getRandomMusicInfo)
    router.get('/musics/:id', $app.controller.client.music.getMusicInfo)
}