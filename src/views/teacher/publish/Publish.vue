<template>
    <div class="publish">
        <top-nav title="发布管理" :isShow="false" />
        <van-cell center title="发布用工" icon="wap-nav">
            <template #right-icon>
                <van-icon name="plus" @click="$router.push('/publishment')" size="16"/>
            </template>
        </van-cell>
        <tabs>
            <shenpi/>
            <mystations/>
        </tabs>
        <bottom-nav :active="3"/>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import BottomNav from '@/components/teacher/BottomNav.vue'
// import ListLayout from '@/components/common/ListLayout.vue'
import Tabs from '../../../components/common/Tabs.vue'
import shenpi from './shenpi.vue'
import mystations from './mystations.vue'
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
        TopNav,
        BottomNav,
        // ListLayout,
        Tabs,
        shenpi,
        mystations
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
        handleDetail(id) {
            this.$router.push({
                path: '/jobInfo',
                query: {
                    processInstanceId: id
                }
            })
        },
        // onLoad() {
        //     setTimeout(() => {
        //         this.pageNum++
        //         this.getPublish()
        //         this.loading = false
        //     },1000)
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
                                item.flowState = "审批中"
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