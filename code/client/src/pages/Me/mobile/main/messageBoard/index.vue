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
        width: 96%;
        margin: 20px auto;
        padding: 10px 5px;
        border-radius: 4px;
        background-color: #fff;
    }
</style>