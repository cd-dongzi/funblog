<template>
    <div class="nonedata-box">
        <IconSvg name="icon2" class="nonedata-icon"></IconSvg>
        <p>{{msg}}</p>
    </div>
</template>
<script>
export default {
    props: {
        msg: {
            type: String,
            default: '暂无数据'
        }
    }
}
</script>

<style lang="less">
.nonedata-box {
    text-align: center;
    padding: 10px 0;
        color: @vice-color;
    .nonedata-icon {
        font-size: 50px;
    }
    p {
        font-size: 16px;
        margin-top: 14px;
    }
}
</style>

