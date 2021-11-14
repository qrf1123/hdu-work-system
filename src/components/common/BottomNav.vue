<template>
    <van-tabbar inactive-color="#333" active-color="#004efd" v-model="activeValue">
        <van-tabbar-item to="/employment" icon="friends">应聘</van-tabbar-item>
		<van-tabbar-item to="/notify" icon="bell">公告</van-tabbar-item>
		<van-tabbar-item to="/checkWork" icon="sign">考勤</van-tabbar-item>
        <van-tabbar-item to="/policy" icon="newspaper-o">政策</van-tabbar-item>
		<van-tabbar-item to="/studentInfo" icon="manager">我的</van-tabbar-item>
	</van-tabbar>
</template>

<script>
export default {
    props: ['active'],
    data() {
        return {
            activeValue: 0,
        }
    },
    mounted() {
        this.activeValue = this.$props.active
    }
}
</script>