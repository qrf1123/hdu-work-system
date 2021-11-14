<template>
    <van-tab title="应聘记录">
        <!-- <search placeholder="搜索" @search="handleSearch"/> -->
        <ul class="list">
            <van-list v-model="loading" :finished="finished" finished-text="加载完成!!!" @load="onLoad">
                <list-layout :firstLayout="1" v-for="(item,index) in list" :key="index">
                    <van-icon size="40" color="rgb(81, 125, 252)" name="contact" slot="left-icon"/>
                    <div slot="content">
                        <h4>{{item.stationName}}</h4>
                        <!-- <h4 @click="handleDetail(item.stationId)">{{item.stationName}}</h4> -->
                        <div>
                            <!-- <span>{{item.remarkContent}}</span> -->
                            <!-- <span>{{item.teacher}}</span>
                            <span>{{item.totalNum}}人</span> -->
                        </div>
                    </div>
                    <div slot="right">
                        <span class="date">{{item.createTime}}</span>
                        <van-button  v-if="item.offerState === '1'?true:false" @click="handleResignJob(item.stationId)" size="mini" color="rgb(81, 125, 252)" >我要辞职</van-button>
                        <van-button  v-if="item.offerState === '0'?true:false" @click="handleEmploy(item.stationId)" size="mini" color="rgb(81, 125, 252)" >取消应聘</van-button>
                        <van-button  disabled v-if="((item.offerState !== '0') && (item.offerState !== '1'))?true:false "  size="mini" color="rgb(81, 125, 252)" >{{item.offerState}}</van-button>
                        
                    </div>
                </list-layout>
            </van-list>
        </ul>
        <van-dialog v-model="showCancleApply" title="理由" @confirm="submitCancle" show-cancel-button>
            <van-field
                v-model="remarkContent"
                rows="1"
                autosize
                label="理由"
                type="textarea"
                placeholder="请输入取消应聘的理由"
                />
        </van-dialog>
        <van-dialog v-model="showResignJob" title="理由" @confirm="submitResignJob" show-cancel-button>
            <van-field
                v-model="remarkContent"
                rows="1"
                autosize
                label="理由"
                type="textarea"
                placeholder="请输入辞职的理由"
                />
                <!-- <van-field
                v-model="spareTime"
                rows="1"
                autosize
                label="空闲时间"
                type="textarea"
                placeholder="请输入你的空闲时间"
                /> -->
        </van-dialog>
    </van-tab>
    
</template>

<script>
// import Search from '@/components/common/Search.vue'
import ListLayout from '@/components/common/ListLayout.vue'
export default {
    data() {
        return {
            list: [],
            pageNum: 1,
            loading: false,
            finished: false,
            showCancleApply:false,
            cancleStationId :'',
            showResignJob:false,
            resignJobId:'',
            remarkContent:'',
            spareTime:'',
        }
    },
    components: {
        // Search,
        ListLayout
    },
    methods: {
        onLoad() {
            setTimeout(() => {
                this.pageNum++
                this.getList()
                this.loading = false
            },1000)
        },
        handleSearch(val) {
            console.log(val)
        },
        handleDetail(stationId) {
            this.$router.push({name: 'JobDetail', params: {stationId: stationId}})
        },
        handleEmploy(id) {
            this.showCancleApply = true;
            this.cancleStationId = id;
            // const res = await this.$ajax.post('/system/api/student//cancelAppliedJob',{stationId : id, remarkContent:this.remarkContent}) 
            // console.log(id)
        },
        async submitCancle(){
            const res = await this.$ajax.post('/system/api/student//cancelAppliedJob',{stationId : this.cancleStationId, remarkContent:this.remarkContent}) 
            if(res.data.code === 200){
                this.$toast("取消应聘成功")
                this.loading = true
                this.finished = false
                // this.$router.push('/job/record');
                this.getList();
            }else{
                this.$toast("取消应聘失败")
            }

            this.showCancleApply = false
        },
         handleResignJob(id){
            this.showResignJob = true;
            this.resignJobId = id;
        },
        async submitResignJob(){
            const res = await this.$ajax.post('/system/api/student//resignJob',{stationId : this.resignJobId, remarkContent:this.remarkContent}) 
            if(res.data.code === 200){
                this.$toast("辞职成功")
                this.loading = true
                this.finished = false
                // this.$router.push('/job/record');
                this.getList();
            }else{
                this.$toast("辞职失败")
            }

            this.showResignJob = false
        },
        async getApplylist(){
                const res = await this.$ajax.get(`/system/api/student/getMyStations`)
                // console.log(res.data.data)
                // const res = await this.$ajax.get(`/system/api/student/queryMyApply`)
                // if(res.data){
                if(res.data.code === 200 ){
                    
                res.data.data.forEach(item => {
                    
                    // item.createTime = item.createTime.slice(0,10);
                    // 0-应聘，1-录用，2-解聘，3-提交辞职，4-批准辞职，5-拒绝，6-已结束
                    switch (item.offerState) {
                        // case '0':
                        //     // 有效的加空格的字符是："\xa0"
                        //     item.offerState = '应聘'
                        //     break;
                        // case '1':
                        //     item.offerState = "录用"
                        //     break;
                        case '2':
                            item.offerState = "被解聘"
                            break;
                        case '3':
                            item.offerState = "提交辞职"
                            break;
                        case '4':
                            item.offerState = "批准辞职"
                            break;
                        case '5':
                            item.offerState = "被拒绝"
                            break;
                        case '6':
                            item.offerState = "已经结束"
                            break;
                        default:
                            break;
                    }
                    if(item.delFlag === "1"){
                        item.offerState = "已取消"
                    }
                    if(item.delFlag === "2"){
                        item.offerState = "拒绝辞职"
                    }
                    this.list.unshift(item);
                });
                
                    this.finished = true
            }
        
        },
        // async getJobList(){
        //     const res = await this.$ajax.get('/system/api/student/queryMyJob')
        //     if(res.data) {
                
        //         res.data.forEach(item => {
        //             switch (item.offerState) {
        //                 // case '0':
        //                 //     // 有效的加空格的字符是："\xa0"
        //                 //     item.offerState = '应聘'
        //                 //     break;
        //                 // case '1':
        //                 //     item.offerState = "录用"
        //                 //     break;
        //                 case '2':
        //                     item.offerState = "被解聘"
        //                     break;
        //                 case '3':
        //                     item.offerState = "提交辞职"
        //                     break;
        //                 case '4':
        //                     item.offerState = "批准辞职"
        //                     break;
        //                 case '5':
        //                     item.offerState = "被拒绝"
        //                     break;
        //                 case '6':
        //                     item.offerState = "已经结束"
        //                     break;
        //                 default:
        //                     break;
        //             }
        //                 this.list.push(item);
        //                 this.finished = true

        //         });
        //     }
        // },
        getList(){
            this.list = []
            this.getApplylist()
            // .then(()=>{
            //     this.getJobList();
            // })
        },
        // async getList() {
        //      const res = await this.$ajax.get(`/system/api/student/queryMyApply`)
        //         if(res.data){
        //         res.data.forEach(item => {
        //             item.createTime = item.createTime.slice(0,10);
        //             // 0-应聘，1-录用，2-解聘，3-提交辞职，4-批准辞职，5-拒绝，6-已结束
        //             switch (item.offerState) {
        //                 case '0':
        //                     // 有效的加空格的字符是："\xa0"
        //                     item.offerState = '取消应聘'
        //                     break;
        //                 case '1':
        //                     item.offerState = "录用"
        //                     break;
        //                 case '2':
        //                     item.offerState = "解聘"
        //                     break;
        //                 case '3':
        //                     item.offerState = "提交辞职"
        //                     break;
        //                 case '4':
        //                     item.offerState = "批准辞职"
        //                     break;
        //                 case '5':
        //                     item.offerState = "拒绝"
        //                     break;
        //                 case '6':
        //                     item.offerState = "已经结束"
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         });
        //         this.list = res.data
        //             this.finished = true
        //     }
        // }
    },
    mounted() {
        this.getList()
        console.log(this.list);
    }
}
</script>

<style scoped>
.van-row .van-col--9:nth-child(2){
    margin-top: 10px;
    padding-left: 1px;
}

.van-col--9 .van-search {
    height: 36px;
    padding: 3px;
}

.van-dropdown-menu >>> .van-dropdown-menu__bar {
    height: 36px;
    box-shadow: 0 0 0 #fff;
}
.van-button {
    margin-top: 13px;
    margin-left: 15px;
}

</style>