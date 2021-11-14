<template>
    <div class="employ">
        <top-nav title="工时详情" :isShow="true" />
        <!-- <van-cell-group>
            <van-cell v-for="(item,index) in jobDetail" :key="index" :title="item.name" :value="item.value ? item.value : '信息为空' "/>
        </van-cell-group> -->
        <van-cell-group >
            <van-field label-width="103px" v-if="false" label-align="right" label="id" v-model="model.id"  readonly />
            <van-field label-width="103px" label-align="right" label="学生学号" v-model="model.userId" readonly />
            <van-field label-width="103px" label-align="right" label="工作日期" v-model="model.workDate" readonly />
            <van-field label-width="103px" label-align="right" label="工作时长(min)" v-model="model.workMinutes" readonly />
            <van-field label-width="103px" label-align="right" label="确认状态" v-model="model.comfirmStatus" readonly />
            <van-field label-width="103px" label-align="right" label="确认工时(min)" v-model="model.comfirmMinutes" readonly />
        </van-cell-group>
        <van-button v-if="this.comfirmStatus === '未确认'?true:false" size="mini"   color="rgb(81, 125, 252)" block @click="handleConfirm()">确认工时</van-button>
        <van-button v-if="((this.comfirmStatus === '未确认') || (this.comfirmStatus === '用工老师已确认'))?true:false" size="mini"  color="rgb(81, 125, 252)" block @click="ConfirmModify = true">修改工时</van-button>
        <van-button v-if="this.comfirmStatus === '用工老师已确认'?true:false" size="mini"  color="rgb(81, 125, 252)" block @click="handleCancle()">取消确认</van-button>
        <van-dialog v-model="ConfirmModify" title="理由" @confirm="onConfirmModify" show-cancel-button>
            <van-field
                v-model="comfirmMinutes"
                rows="1"
                autosize
                label="修改时长"
                type="textarea"
                placeholder="请输入确认工时(min)"
                />
        </van-dialog>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
    data() {
        return {
            model:'',
            comfirmStatus :'',
            detail: [],
            showButton: false,
            value1:'11111',
            ConfirmModify:false,
            comfirmMinutes:'',
            p:''
        }
    },
    components: {
        TopNav
    },
    methods: {
        async handleConfirm(){
            const res = await this.$ajax.post('/system/api/teacher/workHoursComfirm',{id : this.model.id})
            if(res.data.code === 200){
                this.$toast(res.data.msg);
            }else{
                this.$toast(res.data.msg);
            }
            this.$router.push({path:'/confirm',query:{model : this.p}});
        },
        async onConfirmModify(){
             const res = await this.$ajax.post('/system/api/teacher/workHoursUpdate',{id : this.model.id,comfirmMinutes:this.comfirmMinutes})
            if(res.data.code === 200){
                this.$toast(res.data.msg);
            }else{
                this.$toast(res.data.msg);
            }
            this.$router.push({path:'/confirm',query:{model : this.p}});
        },
        async handleCancle(){
            const res = await this.$ajax.post('/system/api/teacher/cancelWorkHoursComfirm',{id : this.model.id})
            if(res.data.code === 200){
                this.$toast(res.data.msg);
            }else{
                this.$toast(res.data.msg);
            }
        this.$router.push({path:'/confirm',query:{model : this.p}});
        },

    },
    
    mounted() {
        this.comfirmStatus = this.$route.query.item.comfirmStatus
        this.model=this.$route.query.item
        this.p = this.$route.query.model
        console.log(this.model);
        console.log(this.p);
    }
}
</script>

<style scoped>
.van-button {
    margin: 10px 20px;
    /* width: 95%; */
    width : 70px; 
    display:inline-block; 
    float: right;
    border-radius: 10%;
    /* margin-left:30px */
}
</style>