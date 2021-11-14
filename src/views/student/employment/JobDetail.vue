<template>
    <div class="employ">
        <top-nav title="岗位信息" :isShow="true" />
        <van-cell-group>
            <van-field label="部门名称" v-model="detail.deptName"  readonly />
            <van-field label="岗位名称" v-model="detail.stationName" readonly />
            <van-field label="备注内容" v-model="detail.remarks" readonly />
            <van-field label="所需能力" v-model="detail.skillQeruire" readonly />
            <van-field label="工作内容" v-model="detail.stationContent" readonly />
            <van-field label="工作地点" v-model="detail.stationLocation" readonly />
            <van-field label="部门老师" v-model="detail.stationTeacher" readonly />
            <van-field label="岗位类型" v-model="detail.stationType" readonly />
            <van-field label="用工学期" v-model="detail.termName" readonly />
            <van-field label="总需人数" v-model="detail.totalNum" readonly />
            <van-field label="已有人数" v-model="detail.usedTotalNum" readonly />
            <van-field label="开始时间" v-model="detail.workStartTime" readonly />
            <van-field label="结束时间" v-model="detail.workEndTime" readonly />
        </van-cell-group>
        <!-- <van-button v-if="showButton" round color="rgb(81, 125, 252)" block @click="handleEmploy()"> 我要应聘 </van-button> -->
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
    data() {
        return {
            detail: [],
            showButton: false,
            value1:'11111'
        }
    },
    components: {
        TopNav
    },
    methods: {
        async getJobInfo() {
            const stationId = parseInt(this.$route.params.stationId)
            const res =await this.$ajax.get('/system/api/student/getStationDetails',{params: {stationId: stationId}})
            if(res.data.code === 200) {
                const detail = res.data.data
                detail.workStartTime = detail.workStartTime.slice(0,10);
                if(detail.workEndTime){
                detail.workEndTime = detail.workEndTime.slice(0,10);
                }
                
                switch (detail.stationType) {
                    case "1":
                        detail.stationType = "固定岗"
                        break;
                    case "2":
                        detail.stationType = "临时岗"
                        break;
                    case "3":
                        detail.stationType = "假期岗"
                        break;
                    case "4":
                        detail.stationType = "助教岗"
                        break;
                    case "5":
                        detail.stationType = "助管岗"
                        break;
                
                    default:
                        break;
                }
                this.detail = detail
                console.log(this.detail);
                // this.jobDetail = detail.slice(1)
                this.showButton = true
            }
        },
        handleEmploy() {
            const stationId = parseInt(this.$route.params.stationId)
            this.$router.push({name: 'Employ', params: {stationId: stationId}})
        }
    },
    mounted() {
        this.getJobInfo()
    }
}
</script>

<style scoped>
.van-button {
    margin: 10px auto;
    width: 95%;
}
</style>