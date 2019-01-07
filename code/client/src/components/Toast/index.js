import Vue from 'vue'
import ToastComponent from './main'

const merge = ($data, option) => {
    for ( let prop in option) {
        if ($data.hasOwnProperty(prop)) {
            $data[prop] = option[[prop]]
        }
    }
}

// extend 是构造一个组件的语法器.传入参数，返回一个组件
const ToastConstructor = Vue.extend(ToastComponent)
let component
const Toast = (option={}) => {
    component = new ToastConstructor()
    if (typeof option !== 'object') {
        component.content = option
    }else{
        merge(component.$data, option)
    }
    component.$mount()
    document.querySelector('body').appendChild(component.$el)
    component.show = true
    // return new Promise( (resolve, reject) => {
    //     component.success = () => {
    //         component.show = false
    //         resolve()
    //     }
    //     component.cancel = () => {
    //         component.show = false
    //         reject()
    //     }
    // })

}

export default Toast