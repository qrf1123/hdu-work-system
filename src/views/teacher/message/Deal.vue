<template>
    <van-tab title="事项审批">
        <ul class="list">
            <list-layout :firstLayout="1" v-for="(item,index) in dealList" :key="index">
                <van-icon size="40" color="rgb(81, 125, 252)" name="records" slot="left-icon"/>
                <div slot="content">
                    <h4>{{item.applyTitle}}</h4>
                    <div>
                        <span>申请人：{{item.nickName}}</span>
                    </div>
                </div>
                <div slot="right">
                    <span class="date">{{item.createTime}}</span>
                    <van-button plain @click="handleDeal(item)" size="mini" color="rgb(81, 125, 252)">查看</van-button>
                </div>
            </list-layout>
            
        </ul>
    </van-tab>
</template>

<script>
import ListLayout from '@/components/common/ListLayout.vue'
export default {
    data() {
        return {
            dealList: [],
            isRead: false,
            isDealed: false
        }
    },
    components: {
        ListLayout
    },
    methods: {
        async getTaskLists() {
            await this.$ajax.get('system/api/teacher/queryTeacherStationAccept')
            .then(res => {
                console.log(res.data)
                res.data.forEach(item => {
                    console.log(item.offerState)
                    if(item.offerState === "3"){
                        item.createTime = item.createTime.slice(0,10);
                        item.applyTitle = "辞职申请"
                        this.dealList.push(item)
                    }
                });
            }).catch(err => {
                console.log(err)
            })
            console.log(this.dealList)
        },
        handleDeal(item) {
            console.log(item)
            this.$router.push({ name: 'checkDetail', params: { user: item }})


        }
    },
    mounted() {
        this.getTaskLists()
    }
}
</script>