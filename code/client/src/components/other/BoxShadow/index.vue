<template>
    <div ref="box" class="box" :style="boxShadow" @mousemove="mousemove" @mouseout="mouseout">
        <div class="df-c item text" :style="transform">{{text}}</div>
    </div>
</template>
<script>
    export default {
        props: ['text'],
        data() {
            return {
                shadow: {
                    x: 0,
                    y: 0,
                    s: 0,
                    color: 'rgba(0, 0, 0, 0.15)'
                },
                w: 0,
                h: 0,
                offset: null
            }
        },
        computed: {
            boxShadow() {
                let {
                    x,
                    y,
                    s,
                    color
                } = this.shadow
                if (!x && !y && !s) return
                return {
                    boxShadow: `${x}px ${y}px ${s}px ${color}`
                }
            },
            transform() {
                let {
                    xScale,
                    yScale
                } = this.shadow
                if(!xScale && !yScale) return
                let ang = (xScale > yScale ? xScale : yScale) || 0
                return {
                    transform: `rotate3d(${xScale || 0}, ${yScale || 0}, ${xScale*yScale/2 || 0}, ${180*ang}deg)`
                }
            }
        },
        mounted() {
            this.getStyle()
        },
        methods: {
            getStyle() {
                let obj = this.$refs.box
                this.w = obj.clientWidth
                this.h = obj.clientHeight
                this.offset = this.getCoords(obj)
            },
            mousemove(e) {
                let x = e.clientX - this.offset.left,
                    y = e.clientY - (this.offset.top-document.documentElement.scrollTop)
                let w = this.w / 2,
                    h = this.h / 2
                this.setShadow(x - w, y - h)
            },
            setShadow(x, y) {
                let x1 = Math.abs(x),
                    y1 = Math.abs(y)
                let s = x1 > y1 ? x1 : y1
                this.shadow = Object.assign({}, this.shadow, {
                    x: -x / 3,
                    y: -y / 3,
                    s: s,
                    xScale: x / this.w * 2,
                    yScale: y / this.h * 2
                })
            },
            mouseout() {
                this.shadow = {
                    x: 0,
                    y: 0,
                    s: 0,
                    color: 'rgba(0, 0, 0, 0.15)'
                }
            },
            getCoords(el) {
                let box = el.getBoundingClientRect(),
                    doc = el.ownerDocument,
                    body = doc.body,
                    html = doc.documentElement,
                    clientTop = html.clientTop || body.clientTop || 0,
                    clientLeft = html.clientLeft || body.clientLeft || 0,
                    top = box.top + (self.pageYOffset || html.scrollTop || body.scrollTop) - clientTop,
                    left = box.left + (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft
                return {
                    'top': top,
                    'left': left
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @width: 3rem;
    @maxWidth: 400px;
    @size: 0.5rem;
    @maxSize: 80px;
    .box {
        width: @width;
        height: @width;
        max-width: @maxWidth;
        max-height: @maxWidth;
        overflow: hidden;
        border-radius: 50%;
        font-size: @size;
        @media screen and (min-width: @pc-width){
            font-size: @maxSize
        }
    }

    .item {
        width: 100%;
        height: 100%;
        color: #fff;
        transform-style: preserve-3d;
        &.text {
            text-shadow: 0 1px 0 #ccc,
            0 2px 0 #c9c9c9,
            0 3px 0 #bbb,
            0 4px 0 #b9b9b9,
            0 5px 0 #aaa,
            0 6px 1px rgba(0, 0, 0, 0.1),
            0 0 5px rgba(0, 0, 0, 0.1),
            0 1px 3px rgba(0, 0, 0, 0.3),
            0 3px 5px rgba(0, 0, 0, 0.2),
            0 5px 10px rgba(0, 0, 0, 0.25);
        }
    }
</style>
