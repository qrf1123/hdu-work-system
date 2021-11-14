<template>
    <van-search v-model="searchValue" :placeholder="placeholder" @search="onSearch" shape="round"/>
</template>

<script>
export default {
    data() {
        return {
            searchValue: ''
        }
    },
    props: ['placeholder'],
    methods: {
        onSearch(value) {
            this.$emit('search', value)
        }
    }
}
</script>

<style scoped>
.van-search {
    margin: 10px 0;
}
</style>