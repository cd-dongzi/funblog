<template>
    <div>
        <!-- <RaindropCanvas></RaindropCanvas> -->
        <!-- <Cat></Cat> -->
        <!-- <TimeLine></TimeLine> -->
    </div>
</template>
<script>
import RaindropCanvas from 'components/RaindropCanvas/index.vue'
import Cat from 'components/Cat'
import TimeLine from 'components/TimeLine'
export default {
    components: {RaindropCanvas, Cat, TimeLine},
    asyncData ({store, route}) {
        return store.dispatch('getDemo')
    }
}
</script>
<style lang="less">

</style>