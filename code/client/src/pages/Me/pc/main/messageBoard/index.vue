<template>
    <div id="message-board" class="message-board">
        <Editor></Editor>
        <MessageList></MessageList>
        <FillInfo></FillInfo>
    </div>
</template>
<script>
    import Editor from './editor'
    import FillInfo from './fillInfo'
    import MessageList from './messageList'
    export default {
        components: {
            Editor,
            FillInfo,
            MessageList
        }
    }
</script>
<style lang="less">
    .message-board {
        width: 90%;
        margin: 20px auto;
        padding: 30px 20px;
        border-radius: 10px;
        background-color: #fff;
    }
</style>