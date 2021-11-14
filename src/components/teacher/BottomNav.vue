<template>
    <van-tabbar inactive-color="#333" active-color="#004efd" v-model="activeValue">
		<van-tabbar-item to="/message" icon="chat-o">消息</van-tabbar-item>
        <!-- 新增公告bar -->
		<van-tabbar-item to="/Tnotify" icon="bell">公告</van-tabbar-item>
        <!-- 新增政策性文件bar -->
        <van-tabbar-item to="/Tpolicy" icon="newspaper-o">政策</van-tabbar-item>
        
		<van-tabbar-item to="/publish" icon="edit">发布</van-tabbar-item>
		<van-tabbar-item to="/admission" icon="bag-o">录取</van-tabbar-item>
        <van-tabbar-item to="/confirm" icon="sign">工时</van-tabbar-item>
		<van-tabbar-item to="/teacherInfo" icon="manager">我的</van-tabbar-item>
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
    activated(){
        this.activeValue = this.$props.active
    },
    mounted() {
        this.activeValue = this.$props.active
    }
}
</script>