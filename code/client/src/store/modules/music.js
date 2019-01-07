import Vue from 'vue'
import Music from '@/api/music'
import MusicTab from '@/api/musicTab'
const music = {
    state: {
        musics: [],
        randomMusics: [],
        currentMusic: {},
        currentMusics: [],
        currentClassify: ''
    },
    actions: {
        // 获取标签
        getMusicTabs ({commit}) {
            return new Promise(async (resolve, reject) => {
                const res = await MusicTab.getMusicTabs()
                commit('SET_MUSICS', {
                    type: 'tab',
                    data: res.data
                })
                resolve()
            })
        },
        // 获取对应音乐
        getMusics ({commit, state}, params) {
            let {classify='all', pageindex, pagesize} = params
            if (!state.musics.find(item => item.name === classify)) {
                classify = 'all'
            }
            const obj = state.musics.find(item => item.name === classify)
            // 没有更多
            if (obj.hasMore === false) {
                return
            }
            // 没有加载
            if (obj.pageindex && obj.prev_pageindex === obj.pageindex) {
                return
            }
            return new Promise(async (resolve, reject) => {
                const res = await Music.getMusics({
                    type: classify === 'all' ? '':classify,
                    pageindex, pagesize
                })
                const list = res.data

                // 是否还能加载更多
                if (list.length < pagesize) {
                    obj.hasMore = false
                }else{
                    obj.hasMore = true
                }
                
                obj.prev_pageindex = pageindex
                // 是否还能加载更多
                if (pageindex === 1) {
                    commit('SET_MUSICS', {
                        type: 'music',
                        data: list,
                        classify
                    })
                }else{
                    commit('SET_MUSICS', {
                        type: 'music',
                        data: (obj.list || []).concat(list),
                        classify
                    })
                }
                resolve()
            })
        },
        getRandomMusics ({commit}, params) {
            return new Promise(async (resolve, reject) => {
                const res = await Music.getRandomMusics(params)
                commit('SET_RANDOM_MUSICS', res.data)
                resolve()
            })
        },
        async getMusicInfo ({commit}, params) {
            return new Promise(async (resolve, reject) => {
                const res = await Music.getMusicInfo(params.id)
                commit('SET_CURRENT_MUSIC', res.data)
                resolve()
            })
        },
        async getRandomMusicInfo ({commit, state}, params) {
            if (!params) {
                params = {
                    url: state.currentMusic.url
                }
            }
            return new Promise(async (resolve, reject) => {
                const res = await Music.getRandomMusicInfo(params)
                commit('SET_CURRENT_MUSIC', res.data)
                resolve(res.data)
            })
        }   
    },
    mutations: {
        SET_MUSICS (state, payload) {
            const {type, data, classify} = payload
            if (type === 'tab') {
                state.musics = [{
                    name: 'all'
                }, ...data].map(item => {
                    item.path = `/music/${item.name}`
                    return item
                })
            }else {
                let obj = state.musics.find(item => item.name === classify),
                    index = state.musics.findIndex(item => item.name === classify)
                obj = Object.assign({}, obj, {
                    list: data
                })
                Vue.prototype.$set(state.musics, index, obj)
            }
        },
        SET_RANDOM_MUSICS (state, payload) {
            state.randomMusics = payload
        },
        SET_CURRENT_MUSICS (state, payload) {
            state.currentMusics = payload
        },
        SET_CURRENT_MUSIC_CLASSIFY (state, payload) {
            state.currentClassify = payload.classify
        },
        SET_CURRENT_MUSIC (state, payload) {
            state.currentMusic = payload
        },
        SET_MUSIC_PAGEINDEX (state, payload) {
            if (state.musics.every(item => item.name !== payload.classify)) {
                payload.classify = 'all'
            }
            if (payload.type === 'refresh') {
                const currentMusic = state.musics.find(item => item.name === payload.classify)
                currentMusic.pageindex = 1
            }else{
                const currentMusic = state.musics.find(item => item.name === payload.classify)
                currentMusic.pageindex || (currentMusic.pageindex = 1)
                currentMusic.pageindex ++  
            }
        }
    }
}

export default music