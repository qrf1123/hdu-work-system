<template>
    <div class="employment">
        <top-nav v-if="item.offerState === '1' ? true:false" title="学生详情" :isShow="true" />
        <top-nav v-if="item.offerState === '0' ? true:false" title="学生应聘详情" :isShow="true" />
        <div class="detail">
            <h4>{{studentInfo.nickname}}</h4>
            <table >
                <tr>
                    <td >学号:</td>
                    <td>{{studentInfo.staffId}}</td>
                </tr>
                <tr>
                    <td>性别:</td>
                    <td>{{studentInfo.sex === "0"?"男":"女"}}</td>
                </tr>
                <tr>
                    <td>学院:</td>
                    <td>计算机学院</td>
                </tr>
                <tr>
                    <td>电话号码：</td>
                    <td>{{studentInfo.phonenumber ? studentInfo.phonenumber : '暂未填写'}}</td>
                </tr>
                <tr>
                    <td>邮件：</td>
                    <td>{{studentInfo.email ? studentInfo.email : '暂未填写'}}</td>
                </tr>
                <tr>
                    <td style="width:70px" v-if="item.offerState === '0' ? true:false">应聘岗位：</td>
                    <td v-if="item.offerState === '1' ? true:false">已在岗位：</td>
                    <td v-if="(item.offerState !== '0') && (item.offerState !== '1')?true:false">岗位名称：</td>
                    <td>{{this.$route.query.user.stationName}}</td>
                </tr>
                <tr>
                    <td>空闲时间：</td>
                    <td>{{this.$route.query.user.remarkContent ? this.$route.query.user.remarkContent : '暂未填写'}}</td>
                </tr>
            </table>
            <van-button  v-if="item.offerState === '0' ? true:false" color="rgb(81, 125, 252)" size="small" type="info" @click="handleEmploy()">录用</van-button>
            <van-button  v-if="item.offerState === '1' ? true:false" color="rgb(81, 125, 252)" size="small" type="info" @click="handleReleaseApplyJob()">解聘</van-button>
            <van-button disabled v-if="(item.offerState !== '0') && (item.offerState !== '1')?true:false"  size="small" color="rgb(81, 125, 252)">{{item.offerState}}</van-button>
        </div>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
    data() {
        return {
            studentInfo: {},
            item:{}
        }
    },
    components: {
        TopNav
    },
    methods: {
        async handleReleaseApplyJob(id){
           id = this.$route.query.user.id
           const res = await this.$ajax.post('/system/api/teacher/releaseApplyJob',{id:id})
           if(res.data.code === 200){
               this.$toast("解聘成功")
               this.$router.push("/admission")
           }else{
               this.$toast("解聘失败")
           }
        },
        handleEmploy(id) {
            this.$dialog.confirm({
                title: '确认录取',
                message: '确认录取该学生吗？',
            }).then(() => {
                id = this.$route.query.user.id
                this.$ajax.post('/system/api/teacher//commitApplyJob',{id:id}).then((res => {
                    if(res.data.code === 200) {
                        this.$toast(res.data.msg)
                        this.$router.push("/admission")
                    }
                })).catch(err => {
                    console.log(err)
                })
            }).catch(() => {
                // on cancel
            });
        },
        async getStudentInfo() {
            const staffId = this.$route.query.user.staffId
            this.item = this.$route.query.user
            const res = await this.$ajax.get('/system/api/teacher/queryStudentInfo',{params: {staffId: staffId}})
            if(res) {
                this.studentInfo = res.data
            }
            console.log(this.studentInfo)
        }
    },
    mounted() {
        this.getStudentInfo()
    }
}
</script>

<style scoped>
    .detail {
        overflow: hidden;
        width: 90%;
        margin: 10px auto;
        background-color: #fff;
        border: 1px solid #eee;
        padding: 20px;
        box-sizing: border-box;
    }
    h4 {
        margin-bottom: 10px;
    }
    tr {
        font-size: 14px;
        height: 35px;
        color: #444;
    }
    tr td:first-child {
        width: 40%;
    }
    .van-button {
        float: right;
        margin: 10px 10px;
    }
</style>