<template>
    <div class="pc-me-main">
        <div class="me-container">
            <Personal></Personal>
            <MessageBoard></MessageBoard>
        </div>
        <div class="style-container" ref="style-container"></div>
    </div>
</template>
<script>
import Personal from './personal'
import MessageBoard from './messageBoard'
export default {
    components: {
        Personal,
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
@w: 300px;
.pc-me-main {
    width: calc(~'100% - @{w}');
    margin-left: @w;
}
.me-container {
    max-width: 1000px;
    margin: 0 auto;
}
</style>