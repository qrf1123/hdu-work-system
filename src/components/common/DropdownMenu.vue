<template>
    <van-dropdown-menu active-color="rgb(81, 125, 252)">
        <van-dropdown-item @change="onValueChange(value)" v-model="value" :options="option" />
    </van-dropdown-menu>
</template>

<script>
    export default {
        data() {
            return {
                value: 0
            }
        },
        inject: ['option'],
        methods: {
            onValueChange(value) {
                this.$emit('changeValue', value)
            }
        }
    }
</script>