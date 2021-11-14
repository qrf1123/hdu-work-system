<template>
    <li>
        <van-row v-if="firstLayout">  
            <van-col span="4">
                <slot name="left-icon"></slot>
            </van-col>
            <van-col span="15">
                <slot name="content"></slot>
            </van-col>
            <van-col span="5">
                <slot name="right"></slot>
            </van-col>
        </van-row>
        <van-row v-if="!firstLayout">
            <van-col span="4">
                <slot name="left-icon"></slot>
            </van-col>
            <van-col span="12">
                <slot name="content"></slot>
            </van-col>
            <van-col span="8">
                <slot name="right"></slot>
            </van-col>
        </van-row>
    </li>
</template>

<script>
export default {
    props: ['firstLayout']
}
</script>

<style scoped>
    @import '../../assets/css/list-layout.css';
</style>