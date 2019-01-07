import {
    store
} from '@/entry-client'
import remSetting from 'utils/rem'
import {
    isPC,
    mobileType,
    browserType
} from 'utils/type'
import config from '@/config'

// 屏幕尺寸对应的格式
const judgeScreenSize = width => {
    const sizes = config.screen.sizes
    return sizes.find(item => width >= item.size).name
}
// 屏幕尺寸
const getScreenSize = () => {
    let doc = document.documentElement || document.body
    let height = doc.clientHeight,
        width = doc.clientWidth
    store.commit('SET_SCREEN', {
        width,
        height
    })
    store.commit('SET_SCREEN_SIZE', {
        size: judgeScreenSize(width)
    })
}
// 类型判断
const getType = () => {
    store.commit('SET_BROWSER_TYPE', {
        type: browserType()
    })
    store.commit('SET_MOBILE_TYPE', {
        type: mobileType()
    })
    store.commit('SET_ISPC', {
        value: isPC()
    })
}
const init = () => {
    getScreenSize()
    remSetting()
    getType()
}
export default () => {
    //路由钩子配置
    return new Promise((resolve, reject) => {
        init()
        let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
        window.addEventListener(resizeEvt, init, false)
        resolve()
    })
}

(function () {
    let hiddenProperty = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
        'mozHidden' in document ? 'mozHidden' :  null

    let title = document.title,
        hiddenTitle = '(●—●)喔哟，崩溃啦！',
        showTitle = '(/≧▽≦/)咦！又好了！',
        visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange'),
        timer = null
    let onVisibilityChange = function () {
        if (document.title !== hiddenTitle) {
            title = document.title.replace(showTitle, '')
        }
        if (!document[hiddenProperty]) {
            title = showTitle + title
            document.title = title
            timer = setTimeout(() => {
                clearTimeout(timer)
                document.title = title.replace(showTitle, '')
            }, 2000)
        } else {
            clearTimeout(timer)
            document.title = hiddenTitle
        }
    }
    document.addEventListener(visibilityChangeEvent, onVisibilityChange)
})()