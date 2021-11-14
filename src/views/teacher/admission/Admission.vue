<template>
    <div class="notify">
        <top-nav title="录取管理" :isShow="false" />
             <ul class="list">
            <list-layout  :firstLayout="1" v-for="(item,index) in list" :key="index" >
                <van-icon size="40" color="rgb(81, 125, 252)" name="user-o" slot="left-icon"/>
                <div slot="content">
                    <div>
                        <h4 v-if="item.offerState === '0'?true:false">应聘:{{item.stationName}}</h4>
                        <h4 v-if="item.offerState === '1'?true:false">录取:{{item.stationName}}</h4>
                        <h4 v-if="(item.offerState !== '0') && (item.offerState !== '1')?true:false">{{item.stationName}}</h4>
                    </div>
                    <div>
                        <span>姓名：{{item.nickName}}</span>
                    </div>
                </div>
                <div slot="right">
                    <van-button  @click="handleDetail(item)" size="mini" color="rgb(81, 125, 252)">详情</van-button>
                </div>
            </list-layout>
        </ul>
        <bottom-nav :active="4"/>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import ListLayout from '@/components/common/ListLayout.vue'
import BottomNav from '@/components/teacher/BottomNav.vue'
export default {
    data() {
        return {
            result: [],
            list:[],
            studentInfo:{},
            checked: false,
            activeNames: [''],
        };
    },
    components: {
        TopNav,
        BottomNav,
        ListLayout
    },
    methods: {
        // 解聘改到了 详情页面 这里注释掉了
        // async handleReleaseApplyJob(id){
        //    const res = await this.$ajax.post('/system/api/teacher/releaseApplyJob',{id:id})
        //    if(res.data.code === 200){
        //        this.$toast("解聘成功")
        //        this.getlist();
        //    }else{
        //        this.$toast("解聘失败")
        //    }
        // },
        async getEmployLists() {
           const res = await this.$ajax.get('/system/api/teacher/queryTeacherStationApply')
            if(res) {
                this.list = res.data
            }
            console.log(this.list)
        },
        handleDetail(item){
            this.$router.push({path:'/studentDetail',query:{user : item}})
        },
        async getAcceptLists() {
           const res = await this.$ajax.get('/system/api/teacher/queryTeacherStationAccept')
           console.log(res);
            if(res.data) {
                res.data.forEach(item => {
                    switch (item.offerState) {
                        // case '0':
                        //     // 有效的加空格的字符是："\xa0"
                        //     item.offerState = '应聘'
                        //     break;
                        // case '1':
                        //     item.offerState = "录用"
                        //     break;
                        case '2':
                            item.offerState = "解聘"
                            break;
                        case '3':
                            item.offerState = "提交辞职"
                            break;
                        case '4':
                            item.offerState = "批准辞职"
                            break;
                        case '5':
                            item.offerState = "拒绝"
                            break;
                        case '6':
                            item.offerState = "已经结束"
                            break;
                        default:
                            break;
                    }
                    this.list.push(item)
                });
                // this.list.push(res.data)
            }
            console.log(this.list)
        },
        getlist(){
            this.list=[]
            this.getEmployLists().then(()=>{
                this.getAcceptLists()
            })
        },
    },
    mounted() {
       this.getlist();
    }
}
</script>
<style scoped>
    tr {
        font-size: 14px;
        height: 35px;
        color: #444;
    }
    tr td:first-child {
        width: 35%;
    }
</style>


