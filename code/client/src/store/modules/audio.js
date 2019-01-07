import {mobileType} from '@/utils/type'
import {detectEventSupport} from '@/utils'

// IOS播放音频
function playAudio(cb, cb1) {
    if (window.WeixinJSBridge) {
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            cb && cb()
        }, false)
    } else if (detectEventSupport('WeixinJSBridgeReady')){
        document.addEventListener("WeixinJSBridgeReady", function () {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                cb && cb()
            })
        }, false)
    } else {
        cb && cb1()
    }
}

const audio = {
    state: {
        src: '', // 音频路径
        currentTime: 0, // 当前播放位置
        volume: 1, //音频的音量
        duration: 0, // 音频的长度
        status: 'none', // 音频播放状态
        audio: null, // 音频对象
    },
    actions: {
        // 播放音频
        playAudio({ state, commit }, payload = {}) {
            return new Promise((resolve, reject) => {
                // loading
                commit('SET_AUDIO_STATUS', { status: 'loading' })
                // 传入了src便设置src
                payload.src && commit('SET_AUDIO_SRC', { src: payload.src })

                let phoneType = mobileType()
                // ios类型， 触发自动播放
                if (phoneType === 'iPhone' || phoneType === 'iPad') {
                    playAudio(() => {
                        play()
                    }, () => {
                        play()
                    })
                }else{
                    play()
                }

                // play
                function play() {
                    state.audio.play().then(() => {
                        commit('SET_AUDIO_STATUS', { status: 'playing' })
                        resolve()
                    }).catch(e => {// 音频加载出错
                        console.log('音频加载出错:'+e)
                        commit('SET_AUDIO_STATUS', { status: 'fail' })
                        reject(e)
                    })
                }
            
                
            })
        },
        // 暂停音频
        pauseAudio({ state, commit }) {
            state.audio.pause()
            commit('SET_AUDIO_STATUS', { status: 'pause' })
        }
    },
    mutations: {
        // 音频路径
        SET_AUDIO_SRC(state, payload) { 
            // 通过vue绑定值失败， 所以通过给audio直接赋值 src 成功播放
            state.audio.src = payload.src
            state.src = payload.src
        },
        // 获取音频Dom
        SET_AUDIO(state, payload) { 
            state.audio = payload.audio
        },
        // 设置音频状态
        SET_AUDIO_STATUS(state, payload) { 
            state.status = payload.status
        },
        // 设置音频音量
        SET_AUDIO_VOLUME(state, payload) {
            state.audio.volume = payload.volume
            state.volume = payload.volume
        },
        SET_PROGRESS(state, payload) {
            state.currentTime = payload.currentTime
            state.audio.currentTime = payload.currentTime
        },
        // 设置当前音频当前时间
        SET_AUDIO_CURRENTTIME(state, payload) {
            state.currentTime = payload.currentTime
        },
        // 设置当前音频总时长
        SET_AUDIO_DURATION(state, payload) {
            state.duration = payload.duration
        }
    }
}
export default audio