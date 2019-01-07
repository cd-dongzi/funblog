<template>
    <div>
        <ul>
            <ReplyItem v-for="(item, index) in list" :key="index" :item="item"></ReplyItem>
        </ul>
    </div>
</template>
<script>
import ReplyItem from './replyItem'
export default {
    props: ['list'],
    components: {
        ReplyItem
    }
}
</script>

<style lang="less">
    .reply-box {
        margin-top: 10px;
        .r-li {
            padding-bottom: 10px;
        }
        .reply-line {
            width: 100%;
            display: block;
            position: relative;
            border-top: 1px solid #ededed;
            &:before,
            &:after {
                content: '';
                position: absolute;
                background: transparent;
            }
            &:before {
                border: 7px solid transparent;
                border-bottom-color: #ededed;
                left: 10px;
                top: -14px;
            }
            &:after {
                border: 6px solid transparent;
                border-bottom-color: #fff;
                left: 11px;
                top: -12px;
            }
        }

        @w: 30px;
        @space: 10px;
        .r-main {
            align-items: flex-start;
            padding: 8px 0;
        }
        .r-avatar {
            width: @w;
            height: @w;
            border-radius: 4px;
        }
        .r-content {
            width: calc(~'100% - @{w} - @{space}');
        }
        .r-name, .r-questioner {
            color: @vice-color;
            &:hover {
                text-decoration: underline;
                color: @theme-color;
            }
        }
        .r-text {
            color: #b5a8a8;
            font-size: 14px;
        }
        .r-comment {
            min-height: 50px;
            line-height: 20px;
            color: #6f6560;
            padding: 10px 0;
        }
        .r-foot {
            color: #b5a8a8;
            font-size: 14px;
            .r-reply {
                color: @vice-color;
                margin-left: 8px;
                &:hover {
                    text-decoration: underline;
                    color: @theme-color;
                    cursor: pointer;
                }
            }
        }

        .r-editor-box {
            width: calc(~'100% - @{w} - @{space}');
        }
    }
</style>