<template>
    <div class="pull-load" 
    	:class="[`state-${status}`, isWindow ? 'window-pull-load' : '']" 
    	ref="container" 
    	@touchstart="onTouchStart"
    	@mousedown="onTouchStart"
    	@touchmove="onTouchMove"
    	@mousemove="onTouchMove"
    	@touchend="onTouchEnd"
        @mouseup="onTouchEnd">
	    <div class="pull-load-body" :style="{transform: `translate3d(0, ${pullHeight}px, 0)`}">
	        <div class="pull-load-head">
                <PullHead v-show="status !== 'refreshing'"></PullHead>
                <EmojiLoading v-show="status === 'refreshing'"></EmojiLoading>
				<!-- <slot name="header" v-else>
                    <PullHead v-if="status === 'refreshing'"></PullHead>
				</slot> -->
	        </div>
	        <slot></slot>
	        <div class="pull-load-footer" v-if="showHasMore">
                <SwaggerDotsLoading v-if="status === 'loading'"></SwaggerDotsLoading>
                <End v-else-if="!hasMore"></End>
                <div class="pull-load-footer-default load" v-else></div>
                <!-- <PullFooter :hasMore="hasMore" :showHasMore="showHasMore" v-if="status !== 'loading'"></PullFooter> -->
                <!-- <End v-if="status !== 'loading'"></End> -->
				<!-- <slot name="footer" v-else>
                    <PullFooter :hasMore="hasMore" :showHasMore="showHasMore" v-if="status === 'loading'"></PullFooter>
				</slot> -->
	        </div>
	    </div>
    </div>
</template>
<script>
    import SwaggerDotsLoading from 'components/Loading/swaggerDots'
    import EmojiLoading from 'components/Loading/threeDots/emoji'
    import End from 'components/End'
    import setShowMixin from '@/mixins/setShow'
    export default {
        name: 'PullLoad',
        mixins: [setShowMixin],
        components: {
            SwaggerDotsLoading,
            EmojiLoading,
            End,
            PullFooter: {
                props: ['hasMore', 'showHasMore'],
                template: `<div class="pull-load-footer-default" :class="{nomore: !hasMore && showHasMore, load: showHasMore}"><i></i></div>`
            },
            PullHead: {
                template: `<div class="pull-load-head-default"><i></i></div>`
            }
        },
        props: {
            isWindow: {
                type: Boolean,
                default: false
            },
			hasMore: {//是否还有更多内容可加载
				type: Boolean,
				default: true
			},
            showHasMore: { // 数据全部请求完毕时， 是否显示底部栏
                type: Boolean,
                default: true
            },
			handleLoad: {//加载回调函数, 必须返回Promise
				type: Function,
				default: function(){}
            },
			handleRefresh: {//刷新回调函数, 必须返回Promise
				type: Function,
				default: function(){}
			},
            unLoad: { // 禁止上拉加载加载
                type: Boolean,
                default: false
            },
            unRefresh: { // 禁止下拉刷新
                type: Boolean,
                default: false
            },
			offsetScrollTop: {//必须大于零，使触发刷新往下偏移，隐藏部分顶部内容
				type: Number,
				default: 1
			},
			downEnough: {//下拉满足刷新的距离
				type: Number,
				default: 100
			},
			distanceBottom: {//距离底部距离触发加载更多
				type: Number,
				default: 50
			}
        },
        data () {
			return {
				/*
					status = {
					  init: '',
					  pulling: 'pulling', // 下拉中
					  enough: 'pulling enough', // 下拉到可以刷新了
					  refreshing: 'refreshing', // 刷新中
					  refreshed: 'refreshed', // 刷新完毕
					  reset: 'reset', // 重置
					  loading: 'loading' // 加载中
					}
				 */
				status: '',
		        pullHeight: 0,
		        startX: 0,
                startY: 0,
                isStart: false,


                isPC: true
			}
        },
        mounted () {
            this.container = this.isWindow ? document.body : this.$refs['container']
            window.addEventListener('scroll', this.onScroll)
        }, 
        methods: {
            setShow () {
                this.isPC = this.$store.state.system && this.$store.state.system.isPC
            },
        	// 按下
        	onTouchStart (e) {
                this.isStart = true
                let offset = this.getOffset(e)
                this.startX = offset.x
                this.startY = offset.y
        	},

        	// 移动
        	onTouchMove (e) {
                if (!this.isStart) return
        	    let scrollTop = this.getScrollTop(),
        	        scrollH = this.getScrollHeight(),
        	        h = this.getHeight(),
        	        targetEve = this.getOffset(e),
        	        curX = targetEve.x,
        	        curY = targetEve.y,
        	        diffX = curX - this.startX,
                    diffY = curY - this.startY
                    
        	    // 判断垂直移动距离是否大于5 && 横向移动距离小于纵向移动距离
        	    if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
        	        if (diffY > 5 && scrollTop < this.offsetScrollTop) { // 下拉刷新
        	            this.onPullDownMove({
        	                startY: this.startY,
        	                curY,
        	                diffY
        	            })
        	            e.preventDefault()
        	        } else if (diffY < 0 && (scrollH - scrollTop - h) < this.distanceBottom) { // 上拉加载
        	            this.onPullUpMove({
        	                startY: this.startY,
        	                curY,
        	                diffY
        	            })
        	        }
        	    }
        	    e.cancelBubble = true
            },
            
            onScroll () {
                let scrollTop = this.getScrollTop(),
                    scrollH = this.getScrollHeight(),
                    h = this.getHeight()
                if ((scrollH-scrollTop-h ) < this.distanceBottom) {
                    this.onPullUpMove()
                }
            },

        	// 松开
        	onTouchEnd (e) {
                this.isStart = false
        	    let scrollTop = this.getScrollTop(),
                    targetEve = this.getOffset(e),
        	        curX = targetEve.x,
        	        curY = targetEve.y,
        	        diffX = curX - this.startX,
        	        diffY = curY - this.startY

        	    // 判断垂直移动距离是否大于5 && 横向移动距离小于纵向移动距离
        	    if (Math.abs(diffY) > 5 && Math.abs(diffY) > Math.abs(diffX)) {
        	        this.onPullDownRefresh()
        	    }
        	    // e.preventDefault()
        	    // e.cancelBubble = true          
            },
            
            getOffset (e) {
                let targetEve = e
                if (e.changedTouches) {
                    targetEve = e.changedTouches[0]
                }
                return {
                    x: targetEve.clientX,
                    y: targetEve.clientY
                }
            },

        	// 获取容器的scrollTop
		    getScrollTop () {
		        if (this.container) {
		            if (this.container === document.body) {
		                return document.documentElement.scrollTop || document.body.scrollTop
		            }
		            return this.container.scrollTop
		        } else {
		            return 0
		        }
            },
            // 获取容器的scrollHeight
            getScrollHeight () {
                if (this.container) {
		            if (this.container === document.body) {
                        let elementH = document.documentElement.scrollHeight,
                            bodyH = document.body.scrollHeight
                        return elementH > bodyH ? elementH : bodyH
		            }
		            return this.container.scrollHeight
		        } else {
		            return 0
		        }
            },
            // 获取容器的height
            getHeight () {
                if (this.container) {
		            if (this.container === document.body) {
		                return document.documentElement.clientHeight || document.body.clientHeight
		            }
		            return this.container.clientHeight
		        } else {
		            return 0
		        }
            },

		    // 不能刷新
		    cannotRefresh () {
		        return ['refreshing', 'loading'].some(status => status === this.status)
		    },

        	// 下拉松开刷新
        	async onPullDownRefresh () {
        	    if (this.cannotRefresh()) return false
        	    // 刷新后，回到0
		        this.pullHeight = 0
        	    switch (this.status) {
        	        case 'pulling':
				        this.status = 'reset'
        	            break
        	        case 'enough':
				        this.status = 'refreshing'
        	            await this.handleRefresh()
				        this.status = 'refreshed'
        	            setTimeout(() => {
					        this.status = 'reset'
        	            }, 1000)
        	            break
        	        default:
				        this.status = 'reset'
        	            break
        	    }
        	},

        	// 下拉刷新
		    onPullDownMove (data) {
		        if (this.cannotRefresh() || this.unRefresh || this.isPC) return false
		        let {diffY, startY, curY} = data
		        let status
		        diffY = this.easing(diffY)
		        this.pullHeight = diffY
		        if (diffY > this.downEnough) {
		          status = 'enough'
		        } else {
		          status = 'pulling'
		        }
		        this.status = status
		    },

		    // 上拉加载
		    async onPullUpMove (data) {
		        if (this.cannotRefresh() || !this.hasMore || this.unLoad) return false
		        this.status = 'loading'
		        await this.handleLoad()
		        this.status = 'reset'
		    },

		    // 拖拽的缓动公式 - easeOutSine
		    easing (distance) {
		        var t = distance
		        var b = 0
		        var d = screen.availHeight // 允许拖拽的最大距离
		        var c = d / 2.5 // 提示标签最大有效拖拽距离
		        return c * Math.sin(t / d * (Math.PI / 2)) + b
		    }
        }
    }
</script>
<style lang="less">
    @import './index.less';
</style>