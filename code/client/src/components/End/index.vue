<template>
	<div class="end-box">
		<div class="end-line">end</div>
	</div>
</template>
<style lang="less">
	.end-box {
		text-align: center;
		margin: 10px 0;
        .end-line {
            color: @vice-color;
            position: relative;
            display: inline-block;
            &:before, &:after{
                content: '';
                position: absolute;
                width: 1.5rem;
                max-width: 200px;
                height: 1px;
                background: @vice-color;
                top: 50%;
            }

            &:before{
                right: e('calc(100% + 10px)');
            } 
            &:after {
                left: e('calc(100% + 10px)');
            }
        }
	}
</style>