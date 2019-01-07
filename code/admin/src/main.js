import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import md5 from 'js-md5';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.css';
import './styles/index.less';
import './assets/js/iconfont.js'
import customComponents from './custom-components.js';
import * as filters from './filters'

Vue.use(ElementUI);
Vue.use(customComponents);
Vue.config.productionTip = false;
Vue.prototype.md5 = md5;
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})




/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});
