export default router => {
    router.get('/music/tabs', $app.controller.admin.musicTab.getMusicTabs)
    router.post('/music/tabs', $app.controller.admin.musicTab.addMusicTab)
    router.patch('/music/tabs/:id', $app.controller.admin.musicTab.updateMusicTab)
    router.delete('/music/tabs/:id', $app.controller.admin.musicTab.delMusicTab)
}