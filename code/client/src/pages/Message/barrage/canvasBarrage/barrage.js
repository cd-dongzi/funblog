import { randNumber } from '@/utils/number'
/**
 *canvas 弹幕
 *
 * @class CanvasBarrage
 */
class CanvasBarrage {
    /**
     *Creates an instance of CanvasBarrage.
     * @param {*} {selector, data, space}
     * @memberof CanvasBarrage
     */
    constructor ({selector, data, space, endCallback}) {
        this.canvas = document.querySelector(selector)
        this.canvas.width = this.canvas.clientWidth
        this.canvas.height = this.canvas.clientHeight
        this.ctx = this.canvas.getContext('2d')
        this.data = data
        this.space = space
        this.prevBarrages = []
        this.isPause = false
        this.isEnd = false
        this.endCallback = endCallback
        this.startTime = new Date().getTime()
    }
    init () {
        this.startTime = new Date().getTime()
        this.data = this.data.map((item) => this.setBarrage(item))
        this.render()
    }
    add ({type, data}) {
        this.startTime = new Date().getTime()
        data.forEach(item => {
            if (type === 'add') {
                this.data.push(this.setBarrage({text: item.msg}, new Date()))
            }else{
                this.data.push(this.setBarrage({text: item.msg}))
            }
        })
        if (this.isEnd) {
            this.isEnd = false
            this.render()
        }
    }
    play () {
        this.isPause = false
    }
    pause () {
        this.isPause = true
    }
    // 渲染
    render () {
        if (this.isPause || this.isEnd) {
            return
        }
        // 清楚画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // 绘制
        this.data.forEach((item, index) => {
            this.move(item, () => {
                let text = item.text
                this.data.splice(index, 1)
                // this.data.push(this.setBarrage({text}))
            })
        })
        // 存在数据
        if (this.data.length > 0) {
            requestAnimationFrame(() => {
                this.render()
            })
        }else{
            this.isEnd = true
            this.endCallback && this.endCallback()
        }
    }
    // 弹幕移动
    move (item, cb) {
        let d = new Date()
        // 到达指定时间开始移动
        if (d.getTime() >= item.time) {
            item.x -= item.speed
            if (item.x < -item.width) {
                cb && cb()
            }else{
                this.draw(item)
            }
        }
        
    }
    // 绘制弹幕
    draw ({x, y, color, size, text}) {
        this.ctx.font = this.setFontStyle(size)
        this.ctx.fillStyle = color
        this.ctx.textBaseline = 'hanging'
        this.ctx.fillText(text, x, y)
    }
    // 配置弹幕
    setBarrage (item, time) {
        this.startTime += 1000
        let {text} = item
        let size = randNumber(16, 30),
            color = `rgba(${randNumber(0, 266)}, ${randNumber(0, 266)}, ${randNumber(0, 266)}, ${randNumber(0.5, 1.1)})`,
            {width, height} = this.computedTextSize(text, size),
            x = this.canvas.width + 50,
            y = this.setY(height),
            speed = randNumber(1, 5)
        item = {
            text, // 弹幕文本
            width, // 弹幕宽度
            height, // 弹幕高度
            x, // 弹幕X坐标
            y, // 弹幕Y坐标
            color, // 弹幕颜色
            size, // 弹幕尺寸
            speed, // 弹幕速度
            time: time || this.startTime 
        }
        this.setY(height)
        this.prevBarrages.push(item)
        if (this.prevBarrages.length > this.space) {
            this.prevBarrages.shift()   
        }
        return item
    }
    // 配置弹幕Y坐标， 防止重叠
    setY (height) {
        let h = randNumber(0, this.canvas.height - height)
        while (this.isCrash(h, h+height)) {
            h = randNumber(0, this.canvas.height - height)
        }
        return h
    }
    isCrash (min, max) {
        return this.prevBarrages.some(item => {
            let min1 = item.y,
                max1 = item.y + item.height
            if (min > max1 || max < min1) {
                return false
            } else{
                return true
            }
        })
    }
    // 设置弹幕字体
    setFontStyle (size) {
        return `bold ${size}px Arial`
    }
    // 获取弹幕宽度
    computedTextSize (text, size) {
        let span = document.createElement('span'),
            width = 0,height = 0
        span.style.position = 'absolute'
        span.style.whiteSpace = 'nowrap'
        span.style.font = this.setFontStyle(size)
        span.innerText = text
        span.textContent = text
        document.body.appendChild(span)
        width = span.clientWidth
        height = span.clientHeight
        document.body.removeChild(span)
        return {width, height}
    }
}
export default CanvasBarrage