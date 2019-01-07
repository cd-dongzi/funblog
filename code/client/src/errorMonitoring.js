import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

if (process.env.NODE_ENV === 'production') {
    Raven
    .config('********', {
        // release: '2.2.2'
    })
    .addPlugin(RavenVue, Vue)
    .install()
}
