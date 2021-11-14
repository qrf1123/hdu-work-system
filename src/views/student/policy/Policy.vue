<template>
    <div class="profile">
        <top-nav title="政策文件" :isShow="false" />
        <ul class="list">
            <list-layout :firstLayout="1" v-for="(item,index) in list" :key="index">
                <van-icon size="40" color="rgb(81, 125, 252)" name="description" slot="left-icon"/>
                <div slot="content">
                    <h4>{{item.noticeTitle}}</h4>
                    <div>
                        <span>发布者：{{item.author}}</span>
                    </div>
                </div>
                <div slot="right">
                    <span class="date">{{item.publishDate}}</span>
                    <!-- 这个后面可能要修改，老师说不一定要下载之后才能看内容，可以通过返回的url点击链接查看内容，这里直接下载了，后面根据需求再改吧 -->
                    <!-- <van-button @click="handleDetail(item.noticeId)" size="mini" color="rgb(81, 125, 252)">查看</van-button> -->
                    <!-- <van-button @click="downLoadFile(item.noticeId)" size="mini" color="rgb(81, 125, 252)">下载</van-button> -->
                    <van-button @click="gotoPolicyDetail(item)" size="mini" color="rgb(81, 125, 252)">查看</van-button>

                </div>
            </list-layout>
        </ul> 
        <bottom-nav :active="3"/>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import ListLayout from '@/components/common/ListLayout.vue'
export default {
    data() {
        return {
            list: []
        }
    },
    components: {
        TopNav,
        BottomNav,
        ListLayout
    },
    methods: {
      gotoPolicyDetail(item){
            this.$router.push({path:'/policyDetail',query:{item : item}})
            console.log(item)
        },
        // async downLoadFile(id){
        //     const res = await this.$ajax.get('/system/notice/noticeDetails',{params:{noticeId : id}})
        //     console.log(res);
        // },
        async getList() {
            const res = await this.$ajax.get('/system/notice/noticeList?noticeType=2')
            if(res.data.code === 200) {
                this.list = res.data.data.data
            }
            console.log(res.data)
        }
    },
    mounted() {
        this.getList()
    }
}
</script>