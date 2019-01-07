import Vue from 'vue'
import MagnifierComponent from './main'

const merge = ($data, option) => {
    for ( let prop in option) {
        if ($data.hasOwnProperty(prop)) {
            $data[prop] = option[[prop]]
        }
    }
}

// extend 是构造一个组件的语法器.传入参数，返回一个组件
const MagnifierConstructor = Vue.extend(MagnifierComponent)
let component
const Magnifier = (option={}) => {
    component = new MagnifierConstructor()
    if (typeof option !== 'object') {
        component.url = option
    }else{
        merge(component.$data, option)
    }
    component.$mount()
    document.querySelector('body').appendChild(component.$el)
    component.show = true
}

export default Magnifier