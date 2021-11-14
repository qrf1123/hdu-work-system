<template>
    <van-tab title="签到签退">
        <ul class="list">
            <list-layout v-for="(item,index) in myJob" :key="index" :firstLayout="1">
                <van-icon size="40" color="rgb(81, 125, 252)" name="clock-o" slot="left-icon"/>
                <div slot="content">
                    <h4>{{item.stationName}}</h4>
                    <div>
                        <!-- <span>{{item.teacher}}</span> -->
                    </div>
                </div>
                <div class="sign" slot="right">
                    <span class="date">{{item.operateDate}}</span>
                    <van-button @click="handleSignIn(item.stationId)" size="mini" color="rgb(81, 125, 252)" >签到</van-button>
                    <van-button @click="handleSignOut(item.stationId)" size="mini" color="rgb(81, 125, 252)" >签退</van-button>
                    <van-button @click="handleResign(item.stationId)" size="mini" color="rgb(81, 125, 252)" >补签</van-button>
                    <!-- <van-button @click="resignJob(item.stationId)" size="mini" color="rgb(81, 125, 252)" >辞职</van-button> -->
                </div>
            </list-layout>
        </ul>

        <van-dialog v-model="showResign" title="理由" @confirm="submitResign" show-cancel-button>
            <van-field
                v-model="remarkContent"
                rows="1"
                autosize
                label="辞职理由"
                type="textarea"
                placeholder="请输入辞职的理由"
                />
                <van-field
                v-model="spareTime"
                rows="1"
                autosize
                label="空闲时间"
                type="textarea"
                placeholder="请输入空闲时间"
                />
        </van-dialog>
    </van-tab>
</template>

<script>
import ListLayout from '@/components/common/ListLayout.vue'
export default {
    data() {
        return {
            // myJob: {}
            myJob: [],
            spareTime:'',
            remarkContent:'',
            resignStationId : '',
            showResign:false,
            workDate:'',
            signTime:''
        }
    },
    components: {
        ListLayout
    },
    methods: {
        getNow(){
            var data = new Date();
            var month =data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
            var date = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
            const timeValue = data.getFullYear() + "-" + month + "-" + date;
            return timeValue
        },
        //辞职
        resignJob(id){
            this.showResign = true;
            this.cancleStationId = id;
        },
        async submitResign(){
            const res = this.$ajax.post('/system/api/student//resignJob',{stationId : this.stationId,remarkContent : this.remarkContent,spareTime : this.spareTime})
            if(res.data.code === 200){
                this.$toast("辞职成功")
                this.getList();
            }else{
                this.$toast("辞职失败")
            }

            this.showResign = false
        },

        // 签到
        async handleSignIn(id) {
            console.log(id)
            const res = await this.$ajax.post('/system/api/student/signInOut',{stationId: id,signStatus: '1',resignStatus : '0',workDate:this.getNow()+''})
            if(res.data.code === 200) {
                this.$toast(res.data.msg)
            }else {
                this.$toast(res.data.msg)
            }
            console.log(res.data)
        },
        //签退
        async handleSignOut(id) {
            console.log(id)
            const res = await this.$ajax.post('/system/api/student/signInOut',{stationId: id,signStatus: '2',resignStatus : '0',workDate:this.getNow()+'' })
            if(res.data.code === 200) {
                this.$toast(res.data.msg)
            }else{
                this.$toast(res.data.msg);
            }
            console.log(res.data)
        },
        
        async handleResignIn(id) {
            console.log(id)
            const res = await this.$ajax.post('/system/api/student/signInOut',{stationId: id,signStatus: '1',resignStatus : '1'})
            if(res.data.code === 200) {
                this.$toast(res.data.msg)
            }
            console.log(res.data)
        },
        //补签退
        async handleResignOut(id) {
            console.log(id)
            const res = await this.$ajax.post('/system/api/student/signInOut',{stationId: id,signStatus: '2',resignStatus : '1' })
            if(res.data.code === 200) {
                this.$toast(res.data.msg)
            }
            console.log(res.data)
        },
        async getList() {
            const res = await this.$ajax.get('/system/api/student/queryMyJob')
            if(res.data) {
                res.data.forEach(item => {
                    if(item.offerState === '1'){
                        this.myJob.push(item);
                    }
                });
            }
            console.log(this.myJob);
        },
        handleResign(stationId) {
            this.$router.push({
                path: '/resign',
                query: {stationId: stationId}
            })
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style scoped>
    .list .sign .van-button:nth-child(3) {
        right: 80px;
    }
    .list .sign .van-button:nth-child(4) {
        right: 150px;
    }
</style>