<template>
    <van-tab title="审批流程">
        <!-- 查看审批流程中间过程的的  -->
        <van-dialog v-model="show">
            <van-steps :active="0" direction="vertical" active-color="rgb(36, 126, 255)" active-icon="success">
            <!-- <van-steps :active="0" direction="vertical" active-color="rgb(36, 126, 255)" active-icon="cross"> -->
                <!-- <van-step v-for="(item,index) in flowSteps" :key="index">{{item.nickName}}</van-step> -->
                <van-step >用工老师</van-step>
                <van-step >本部门/学院二级管理员</van-step>
            </van-steps>
        </van-dialog>
        <ul class="list">
            <!-- <van-list v-model="loading" :finished="finished" finished-text="加载完成!!!" @load="onLoad"> -->
            <van-list v-model="loading" :finished="finished" finished-text="加载完成!!!" >
                <list-layout :firstLayout="0" v-for="(item,index) in publishList" :key="index">
                    <van-icon size="40" color="rgb(81, 125, 252)" name="info" slot="left-icon"/>
                    <div slot="content">
                        <h4>{{item.flowName}}</h4>
                        <div>
                            <span>{{item.updateTime}}</span>
                        </div>
                    </div>
                    <div slot="right">
                        <span class="date">{{item.flowState}}</span>
                        <div class="right-bottom">
                            <van-icon v-if="item.flowState === '被驳回'"  @click="toEdit(item.flowId,item.flowName)" size="20" color="rgb(81, 125, 252)" name="edit"/>
                            <van-button style="margin-left: 10px" v-if="item.flowState === '审核中'" color="rgb(81, 125, 252)" size="mini" @click="handleStep(item.flowId)">查看审批</van-button>
                            <van-button v-if="item.flowState === '被驳回' " style="margin-left: 10px"  color="rgb(81, 125, 252)" size="mini" @click="deleteFlowApply(item.flowId)">删除申请</van-button>
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
            processStatus: 1,
            pageNum: 1,
            loading: false,
            finished: false,
            flowSteps:[]
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
        async deleteFlowApply(id){
            const res = await this.$ajax.post('/system/flows/deleteFlow',{flowId:id})
            if(res.data.code === 200){
                this.$toast("删除成功");
                this.finished = false;
                this.getPublish()
            }else{
                this.$toast("删除失败，请重试")
            }
        },
        toEdit(flowId,flowName){
            console.log(flowId,flowName);
            this.$router.push({path:'/edit',query:{flowId : flowId,flowName : flowName}})
        },
        // handleDetail(item) {
        //     this.$router.push({
        //         path: '/jobInfo',
        //         query: {
        //             item: item
        //         }
        //     })
        // },
        async getPublish() {
            const res = await this.$ajax.get(`/system/flows/queryMyFlows`)
            if(res.data.code === 200) {
                res.data.data.forEach(item => {
                    item.createTime = item.createTime.slice(0,10);
                    //没有更新时间 那么更新时间为创建时间
                    if(!item.updateTime){
                        item.updateTime = item.createTime;
                    }else{
                        item.updateTime = item.updateTime.slice(0,10);
                    }
                    switch (item.flowState) {
                            case "1":
                                item.flowState = "已归档" // 暂且认为是 审核通过的叭
                                break;
                            case "2":
                                item.flowState = "已删除"
                                break;
                            case "3":
                                item.flowState = "审核中"
                                break;
                            case "4":
                                item.flowState = "被驳回"
                                break;
                            default:
                                break;
                        }
                });
                this.publishList = res.data.data
                console.log(this.publishList);
                this.finished = true
            }
        },
        async handleStep(processId) {
            this.show = true
            const res = await this.$ajax.get('/system/flows/queryFlowOpers', {params: {flowId: processId}})
            this.flowSteps = res.data.data
            // this.flowSteps.forEach(item => {
            //     if(item.)
            // });
            console.log(this.flowSteps);
            this.flowSteps = this.sortAscByKey(this.flowSteps,("operStatus"))
            console.log(this.flowSteps);
        },
        sortAscByKey(arr,key){
            return arr.sort((a,b)=>{
                let x = a[key];
                let y = b[key];
                return ((x<y)?-1:(x>y)?1:0)
             })
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