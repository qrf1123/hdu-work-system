<template>
    <div class="jobInfo">
        <top-nav title="岗位信息" :isShow="true" />
        <div class="detail">
            <table>
                <tr>
                    <td style="text-align:right">岗位名称:</td>
                    <td>{{detailList.stationName}}</td>
                </tr>
                <tr>
                    <td style="text-align:right">岗位类型:</td>
                    <td>{{detailList.stationType}}</td>
                </tr>
                <tr>
                    <td style="text-align:right">用工学期:</td>
                    <td>{{detailList.termName}}</td>
                </tr>
                <tr>
                    <td style="text-align:right">部门名称:</td>
                    <td>{{detailList.deptName}}</td>
                </tr>
                <tr>
                    <td style="text-align:right">总需人数:</td>
                    <td>{{detailList.totalNum}}人</td>
                </tr>
                <tr>
                    <td style="text-align:right">已用总数:</td>
                    <td>{{detailList.usedTotalNum}}人</td>
                </tr>
                <tr>
                    <td style="text-align:right">贫困生数:</td>
                    <td>{{detailList.usedPoorNum}}人</td>
                </tr>

                <tr>
                    <td style="text-align:right">非贫人数:</td>
                    <td>{{detailList.usedNonpoorNum}}人</td>
                </tr>
                <tr>
                    <td style="text-align:right">其他部门:</td>
                    <td>{{detailList.usedOtherDeptNum}}人</td>
                </tr>
                <tr>
                    <td style="text-align:right">技能要求:</td>
                    <td>{{detailList.skillQeruire}}</td>
                </tr>
                <tr>
                    <td style="text-align:right">部门老师:</td>
                    <td>{{detailList.stationTeacher}}</td>
                </tr>
                <tr>
                    <td style="text-align:right">创建时间:</td>
                    <td>{{detailList.createTime}}</td>
                </tr>
                
                <tr>
                    <td style="text-align:right">开始时间:</td>
                    <td>{{detailList.workStartTime}}</td>
                </tr>
                <tr v-if="detailList.workEndTime">
                    <td style="text-align:right">结束时间:</td>
                    <td>{{detailList.workEndTime}}</td>
                </tr>
                
            </table>
        </div>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
    data() {
        return {
            detailList:[]
        }
    },
    components: {
        TopNav
    },
    methods: {
    
    async getDeatil() {
            const stationId = this.$route.query.stationId
            const res = await this.$ajax.get('/system/api/student/getStationDetails', {params: {stationId: stationId}})
            if(res.data.code === 200) {
                this.detailList = res.data.data
                
                    //岗位类型 1-一般岗，2-临时岗，3-假期岗，4-助教岗，5-助管岗
                    switch (this.detailList.stationType) {
                        case "1":
                            this.detailList.stationType = "一般岗"
                            break;
                        case "2":
                            this.detailList.stationType = "临时岗"
                            break;
                        case "3":
                            this.detailList.stationType = "假期岗"
                            break;
                        case "4":
                            this.detailList.stationType = "助教岗"
                            break;
                        case "5":
                            this.detailList.stationType = "助管岗"
                            break;
                        default:
                            break;
                    }
                    //创建时间
                    const createTime1 = this.detailList.createTime.slice(0,10);
                    const createTime2 = this.detailList.createTime.slice(11,19);
                    this.detailList.createTime = createTime1 + createTime2;

                    if(this.detailList.workStartTime){
                        const workStartTime1 = this.detailList.workStartTime.slice(0,10);
                        const workStartTime2 = this.detailList.workStartTime.slice(11,19);
                        this.detailList.workStartTime = workStartTime1 + workStartTime2;
                    }
                    if(this.detailList.workEndTime){
                        const workEndTime1 = this.detailList.workEndTime.slice(0,10);
                        const workEndTime2 = this.detailList.workEndTime.slice(11,19);
                        this.detailList.workEndTime = workEndTime1 + workEndTime2;
                    }
                    console.log(this.detailList)
            }
        }
    },
    
    mounted() {
        this.getDeatil()
    }
}
</script>

<style scoped>
    .detail {
        width: 95%;
        margin: 10px auto;
        background-color: #fff;
        border: 1px solid #eee;
        box-shadow: 1px 1px 8px rgb(228, 227, 227);
        padding: 20px;
        box-sizing: border-box;
    }
    tr{
        height: 40px;
    }
</style>