<template>
    <div class="checkDetail">
        <top-nav title="考勤异常说明" :isShow="true" />
        <div class="detail">
            <table>
                <tr>
                    <td style="text-align:right">姓名:</td>
                    <td>{{this.$route.params.user.nickName}}</td>
                </tr>
                <tr>
                    <td style="text-align:right">学号:</td>
                    <td>{{this.$route.params.user.staffId}}</td>
                </tr>
                <tr>
                    <td>发起请求:</td>
                    <td>{{this.$route.params.user.applyTitle}}</td>
                </tr>
                <tr>
                    <td>所在岗位:</td>
                    <td>{{this.$route.params.user.stationName}}</td>
                </tr>
                <tr>
                    <td>发起时间:</td>
                    <td>{{this.$route.params.user.createTime}}</td>
                </tr>
                <tr>
                    <td style="text-align:right">原因:</td>
                    <td>{{this.$route.params.user.remarkContent}}</td>
                </tr>
                
            </table>
            <p>
                <!-- 本来应该是有的 但是 当老师拒绝之后 其他的逻辑有问题 所以 这个按钮先隐身吧   -->
                <!-- <van-button size="mini" plain type="danger" @click="passOrNot(0)">不通过</van-button> -->
                <van-button size="mini" plain type="info" @click="passOrNot(1)">通过</van-button>
            </p>
        </div>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
    data() {
        return {
            detail: {},
            userDetail:''
        }
    },
    components: {
        TopNav
    },
    methods: {
        passOrNot(choice){
            //拒绝申请
            if(choice === 0){
                this.$dialog.confirm({
                    message: '确认驳回该同学的辞职申请吗？'
                    }).then(()=>{
                        this.handleReject(this.$route.params.user.id);
                    }).catch(() => {});
            }else{ // 同意申请
                this.$dialog.confirm({
                    message: '确认同意该同学的辞职申请吗？'
                    }).then(()=>{
                        this.handlePass(this.$route.params.user.id);
                    }).catch(() => {});
            }
        },
        async handlePass(id) {
            const res = await this.$ajax.post("/system/api/teacher/approveResignJob",{id : id})
            if(res.data.code === 200){
                this.$toast("已批准该同学的辞职申请!");
                this.$router.push("/message")
            }else{
                this.$message.error("操作失败，请重试～");
            }
        },
        async handleReject(id) {
            const res = await this.$ajax.post("/system/api/teacher/rejectResignJob",{id : id})
            if(res.data.code === 200){
                this.$toast("已驳回同学的辞职申请!");
                this.$router.push("/message")
            }else{
                this.$message.error("操作失败，请重试～");
            }
        }
    },
    mounted() {
        this.userDetail = this.$route.params.user;
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
    tr {
        font-size: 14px;
        height: 50px;
    }
    tr td:nth-child(1) {
        color: #222;
        width: 25%;
    }
    tr td:nth-child(2) {
        color: rgb(78, 81, 78);
    }
    tr p {
        position: relative;
        padding-left: 10px;
        width: 180px;
        height: 28px;
        line-height: 28px;
        border: 1px solid #eee;
    }
    tr p .van-icon {
        position: absolute;
        right: 7px;
        bottom: 7px;
        color: rgb(41, 141, 248);
    }
    tr div {
        padding-left: 10px;
        height: 55px;
        border: 1px solid #eee;
        padding-top: 5px;
    }
    .detail>p {
        margin-top: 15px;
        margin-left: 70%;
        display: flex;
        justify-content: space-between;
    }
</style>