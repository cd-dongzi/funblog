<template>
<div class="home-container">
    <Github githubLink="https://github.com/cd-dongzi/vue-example"></Github>
    <BtnGroup></BtnGroup>
</div>
</template>

<script>
    import Github from 'components/Github/index'
    import BtnGroup from './btns'
    export default {
        name: 'home',
        components: { Github, BtnGroup }   
    }
</script>


<style lang="less" scoped>

</style>
