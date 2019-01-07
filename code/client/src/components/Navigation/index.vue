<template>
    <div class="navigation-container">
        <NavigationToggle @toggle="isNavigationBoxShow=!isNavigationBoxShow" :open="isNavigationBoxShow" class="toggle-btn"></NavigationToggle>
        <NavigationBox :show="isNavigationBoxShow" @close="isNavigationBoxShow=false"></NavigationBox>
    </div>  
</template>
<script>
    import NavigationToggle from './NavigationToggle/index'
    import NavigationBox from './NavigationBox/index'
    export default {
        components: {
            NavigationToggle,
            NavigationBox
        },
        data() {
            return {
                isNavigationBoxShow: false
            }
        }
    }
</script>
<style lang="less">
    @import './style.less';
</style>