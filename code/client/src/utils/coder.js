// 获取元素
function getDomById(id) {
    return document.getElementById(id)
}

//字符串转DOM
function stringToDom(htmlString) {
    var div = document.createElement("div")
    div.innerHTML = htmlString
    return div.children[0]

}

// 转换驼峰写法
function dasherize(str) {
    return str.replace(/::/g, '/')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        .replace(/([a-z\d])([A-Z])/g, '$1_$2')
        .replace(/_/g, '-')
        .toLowerCase()
}


export default class Coder {
    constructor(container) {
        this.container = container
    }

    // 加载html元素
    load(html, delay = 1000) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const dom = stringToDom(html)
                this.container.appendChild(dom)
                resolve()
            }, delay)
        })
    }

    // 设置style样式
    setStyle(selector, styleJson, delay = 1000) {
        return new Promise(resolve => {
            setTimeout(() => {
                const doms = selector ? document.querySelectorAll(selector) : this.container
                let css = ''
                for (const key in styleJson) {
                    const attr = dasherize(key)
                    css += `${attr}:${styleJson[key]};`
                }
                doms.forEach(dom => {
                    dom.style.cssText = css
                })
                resolve()
            }, delay)
        })
    }

    // 添加class
    addClass(selector, className, delay = 1000) {
        return new Promise(resolve => {
            setTimeout(() => {
                const doms = document.querySelectorAll(selector)
                doms.forEach(dom => {
                    let cls = dom.className
                    if (className && typeof className === 'string') {
                        dom.className = `${cls} ${className}`
                    }
                })
            }, delay)
        })
    }
}