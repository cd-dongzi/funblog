<template>
    <div class="mobile-me-main">
        <div class="me-container">
            <MessageBoard></MessageBoard>
        </div>
        <div class="style-container" ref="style-container"></div>
    </div>
</template>
<script>
import MessageBoard from './messageBoard'
export default {
    components: {
        MessageBoard
    },
    data () {
        return {
            coder: null
        }
    }
}
</script>
<style lang="less">
.mobile-me-main {
    width: 100%;
}
.me-container {
    max-width: 1000px;
    margin: 0 auto;
}
</style>