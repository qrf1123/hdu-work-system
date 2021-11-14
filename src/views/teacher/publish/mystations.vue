<template>
    <van-tab title="我的岗位">
        <ul class="list">
            <!-- <van-list v-model="loading" :finished="finished" finished-text="加载完成!!!" @load="onLoad"> -->
            <van-list v-model="loading" :finished="finished" finished-text="加载完成!!!" >
                <list-layout :firstLayout="0" v-for="(item,index) in publishList" :key="index">
                    <van-icon size="40" color="rgb(81, 125, 252)" name="info" slot="left-icon"/>
                    <div slot="content">
                        <h4 @click="handleDetail(item.stationId)">{{item.stationName}}</h4>
                        <div>
                            <span>{{item.workStartTime}}</span>
                        </div>
                    </div>
                    <div slot="right">
                        <span class="date">{{item.stationState}}</span>
                        <div class="right-bottom">
                            <van-button v-if="item.stationState === '已生效'" style="margin-left: 10px"  color="rgb(81, 125, 252)" size="mini" @click="handleStart(item.stationId)">开始</van-button>
                            <van-button v-if="item.stationState === '已开始'" style="margin-left: 10px"  color="rgb(81, 125, 252)" size="mini" @click="handleStop(item.stationId)">结束</van-button>
                        </div>
                    </div>
                </list-layout>
            </van-list>
        </ul>
    </van-tab>
</template>

<script>
import ListLayout from '@/components/common/ListLayout.vue'
export default {
    data() {
        return {
            publishList: [],
            show: false,
            processStatus: 0,
            pageNum: 1,
            loading: false,
            finished: false
        }
    },
    components: {
        // TopNav,
        // BottomNav,
        ListLayout,
        // Tabs,
        // shenpi,
        // mystations
    },
    methods: {
        async handleStart(id){
            const res = await this.$ajax.post("/system/api/teacher/startStation",{stationId : id})
            if(res.data.code === 200){
                this.$toast("成功开始该岗位!");
                this.getPublish()
            }else{
                this.$toast("操作失败,请重试～");
            }
        },
        async handleStop(id){
            const res = await this.$ajax.post("/system/api/teacher/endStation",{stationId : id})
            if(res.data.code === 200){
                this.$toast("成功结束该岗位!");
                this.getPublish()
            }else{
                this.$toast("操作失败,请重试～");
            }
            
        },
        async handleDelete(index,id) {
            console.log(this.publishList[index])
            const res = await this.$ajax.post('/api/activiti/deleteProcess', {processInstanceId: id})
            console.log(res.data)
            if(res.data.code === 200) {
                this.publishList.splice(index,1)
                this.$toast.success(res.msg)
            }else {
                this.$toast.fail('删除失败，请稍后重试！')
            }
        },
        handleDetail(id) {
            this.$router.push({
                path: '/jobInfo',
                query: {
                    stationId: id,
                }
            })
        },
        async getPublish() {
            const res = await this.$ajax.get(`/system/api/teacher/queryTeacherStation`)
            if(res.data) {
                res.data.forEach(item => {
                    item.workStartTime = item.workStartTime.slice(0,10);
                    //没有更新时间 那么更新时间为创建时间
                    // if(!item.updateTime){
                    //     item.updateTime = item.createTime;
                    // }else{
                    //     item.updateTime = item.updateTime.slice(0,10);
                    // }
                    switch (item.stationState) {
                            case "1":
                                item.stationState = "已生效" // 暂且认为是 审核通过的叭
                                break;
                            case "2":
                                item.stationState = "已删除"
                                break;
                            case "3":
                                item.stationState = "已开始"
                                break;
                            case "4":
                                item.stationState = "已结束"
                                break;
                            default:
                                break;
                        }
                });
                this.publishList = res.data
                console.log(this.publishList);
                this.finished = true
                
            }
            
        },
       
        async handleStep(processId) {
            this.show = true
            const res = await this.$ajax.get('/api/activiti/queryTaskDetails', {params: {processInstanceId: processId}})
            console.log(res.data)
            const status = res.data.data[0].rejectStatus
            this.processStatus = parseInt(status)
        }
    },
    mounted() {
        this.getPublish()
    }
}
</script>

<style scoped>
    .middle {
        margin: 0 10px;
    }
    .van-cell {
        margin-bottom: 10px;
    }
</style>