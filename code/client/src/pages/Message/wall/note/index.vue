<template>
    <div class="note" :style="item.style"
        @mousedown.prevent="mousedown">
        <div class="nhead" :style="{backgroundImage: `url(${require(`assets/images/wall/note${item.bg}_1.png`)})`}">{{item.createTime | parseTime('{y}-{m}-{d}')}}</div>
        <div class="nbody wes-3" :style="{backgroundImage: `url(${require(`assets/images/wall/note${item.bg}_2.png`)})`}">{{item.msg}}</div>
        <div class="nfoot df-sb" :style="{backgroundImage: `url(${require(`assets/images/wall/note${item.bg}_3.png`)})`}">
            <!-- <div class="moodpic">
                <img :src="require(`assets/images/wall/face_${item.bg}.gif`)" />
            </div> -->
            <img class="avatar" :src="require(`assets/images/avatar/${item.avatar}.jpg`)" />
            <Link class="username wes" :href="item.url">{{item.name || '匿名'}}</Link>
        </div>
    </div>
</template>
<script>
    import {rectImpact} from '@/utils'
    export default {
        props: {
            item: {
                type: Object,
                default: () => ({})
            },
            noteIndex: Number,
            issueObj: {}
        },
        data () {
            return {
                isDrag: false,
                dragObj: null,
                dragMouseOffset: {
                    x: 0,
                    y: 0
                },
                // 最大拖拽距离
                maxDragOffset: {}
            }
        },
        computed: {
            screen() {
                if (typeof window !== 'undefined') {
                    return this.$store.state.system.screen
                }
                return {}
            }
        },
        methods: {
            mousedown (e) {
                this.isDrag = true
                this.dragObj = e.currentTarget
                this.dragMouseOffset = this.getCurrentOffset(e)
                this.maxDragOffset = this.getMaxDragOffset(e)
                this.LiftingZIndex()
                document.addEventListener('mousemove', this.mousemove)
                document.addEventListener('mouseup', this.mouseup)
            },
            mousemove (e) {
                if (!this.isDrag) return
                let {x, y} = this.getCurrentEleCoords(e)
                let {w, h} = this.maxDragOffset
                if (x < 0) x = 0
                if (x > w) x = w
                if (y < 0) y = 0
                if (y > h) y = h
                this.dragObj.style.left = `${x}px`
                this.dragObj.style.top = `${y}px`
                if (rectImpact(this.issueObj, this.dragObj)) {
                    this.$emit('crash')
                }   
            },
            mouseup () {
                this.isDrag = false
            },
            // 获取
            getMaxDragOffset (e) {
                const target = e.currentTarget
                let w = target.offsetWidth,
                    h = target.offsetHeight
                return {
                    w: this.screen.width - w,
                    h: this.screen.height - h
                }
            },
            // 当前元素提升层级
            LiftingZIndex () {
                let index = this.noteIndex
                this.$emit('update:noteIndex', ++ index)
                this.dragObj.style.zIndex = this.noteIndex
            },
            // 鼠标距离元素的位置
            getCurrentOffset (e) {
                let target = e.target
                let offset = {
                    x: 0, 
                    y: 0
                }
                while (target.className.indexOf('note') < 0) {
                    offset = {
                        x: offset.x + target.offsetLeft + target.clientLeft,
                        y: offset.y + target.offsetTop + target.clientTop
                    }
                    target = target.offsetParent
                }
                offset = {
                    x: e.offsetX + offset.x,
                    y: e.offsetY + offset.y,
                }
                return offset
            },
            // 鼠标当前距离
            getCurrentEleCoords(e){ 
                return {
                    x: e.clientX - this.dragMouseOffset.x,
                    y: e.clientY - this.dragMouseOffset.y
                }
            },
        }
    }
</script>
<style lang="less">
    .note {
        width: 235px;
        cursor: move;
        position: absolute;
        z-index: 1;
        max-height: 235px;
        .nhead {
            width: 235px;
            height: 68px;
            padding: 45px 30px 0px 30px;
            font-family: Georgia;
            color: #999;
        }

        .nbody {
            width: 235px;
            line-height: 20px;
            padding: 0 15px 0 30px;
            word-wrap: break-word;
            font-size: 14px;
            background-position: -2px;
            color: #6f5a5a;
        }

        .nfoot {
            width: 235px;
            height: 72px;
            padding: 20px 20px 10px 30px;
        }

        .moodpic {
            width: 20px;
            height: 20px;
            float: left;
        }

        .moodpic img {
            width: 30px;
            height: 30px;
            object-fit: cover;
            border-radius: 50%;
        }
        .avatar {
            width: 30px;
            height: 30px;
            object-fit: cover;
            border-radius: 50%;
        }

        .username {
            max-width: 150px;
            text-align: right;
            float: right;
            color: #333;
            font-size: 12px;
            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>