import Vue from 'vue'
import NotificationComponent from './main'

const merge = ($data, option) => {
    for ( let prop in option) {
        if ($data.hasOwnProperty(prop)) {
            $data[prop] = option[[prop]]
        }
    }
}

// extend 是构造一个组件的语法器.传入参数，返回一个组件
const NotificationConstructor = Vue.extend(NotificationComponent)
let component
const Notification = (option={}) => {
    component = new NotificationConstructor()
    if (typeof option !== 'object') {
        component.msg = option
    }else{
        merge(component.$data, option)
    }
    component.$mount()
    document.querySelector('body').appendChild(component.$el)
    component.show = true
}

export default Notification