import IconSvg from 'components/IconSvg'
import GlobalMask from 'components/GlobalMask'
import NoneData from 'components/NoneData'
import Back from 'components/Back'
import Link from 'components/Link'
import Toast from 'components/Toast'
import Magnifier from 'components/Magnifier'
import Notification from 'components/Notification'
const install = Vue => {
    Vue.component('IconSvg', IconSvg)
    Vue.component('GlobalMask', GlobalMask)
    Vue.component('NoneData', NoneData)
    Vue.component('Back', Back)
    Vue.component('Link', Link)

    Vue.prototype.$toast = Toast
    Vue.prototype.$imgShow = Magnifier
    Vue.prototype.$notification = Notification
}

export default install
