<template>
    <van-tabs v-model="active"
    title-active-color="rgb(81, 125, 252)"
    color="rgb(48, 52, 253)"
    line-width="50%"
    line-height="1px">
        <slot></slot>
    </van-tabs>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        }
    }
}
</script>