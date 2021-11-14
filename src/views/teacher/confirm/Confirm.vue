<template>
    <div class="confirm">
        <top-nav title="工时确认" :isShow="false" />
        
        <div class="dateSelect">
            <van-dropdown-menu>
                <van-dropdown-item v-model="model.stationId" :options="stationList" />
            </van-dropdown-menu>
            <van-field  :border="false" label="起始日期" right-icon="calender-o" readonly clickable name="calendar" :value="model.searchStartDate"  placeholder="点击选择日期" @click="showCalendar1 = true"/>
            <van-calendar color="rgb(81, 125, 252)" v-model="showCalendar1" @confirm="onConfirmStart" :min-date="minDate" :max-date="maxDate" :show-confirm="false"/>
            <van-field  :border="false" label="终止日期" right-icon="calender-o" readonly clickable name="calendar" :value="model.searchEndDate"  placeholder="点击选择日期" @click="showCalendar2 = true"/>
            <van-calendar color="rgb(81, 125, 252)" v-model="showCalendar2" @confirm="onConfirmEnd" :min-date="minDate" :max-date="maxDate" :show-confirm="false"/>
            <van-cell title="" clickable >
            <template #right-icon>
            <van-button  color="rgb(81, 125, 252)" size="mini" @click="getList(1)">查询</van-button>
            </template>
             </van-cell>
        </div>
        <ul class="list">
            <van-checkbox-group ref="checkGroup" v-model="result">
            <list-layout v-for="(item,index) in workHoursRecords" :key="index" :firstLayout="1">
                <!-- <van-checkbox slot="left-icon" :name="item.id"></van-checkbox> -->
                <van-icon name="contact" size="40" color="rgb(81, 125, 252)" slot="left-icon" />
                <div slot="content">
                    <h4>学生学号：{{item.userId}}</h4>
                    <div class="info">
                        <p>工作日期：{{item.workDate}}</p>
                        <p>工作时长：{{item.workMinutes}}min</p>
                        <p>确认状态：{{item.comfirmStatus}}</p>
                        <p>确认工时：{{item.comfirmMinutes}}min({{(item.comfirmMinutes/60).toFixed(1)}}h)</p>
                    </div>
                </div>
                <div slot="right" >
                    <van-button  @click="toWorkHoursDetail(item)" size="mini" color="rgb(81, 125, 252)">详情</van-button>
                </div>
            </list-layout>
            </van-checkbox-group>
        </ul>
 
         <van-cell @click="handleSelectAll" clickable class="ven-cell-bottom">
             <!-- 占位用的 -->
             <p></p>
            <!-- <van-checkbox v-model="checked">全选</van-checkbox> -->
            <template #right-icon>
                <van-button class="confirmAllButton" color="rgb(81, 125, 252)" size="mini">一键确认</van-button>
            </template>
        </van-cell>

        <bottom-nav :active="5"/>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import BottomNav from '@/components/teacher/BottomNav.vue'
import ListLayout from '@/components/common/ListLayout.vue'
/*
 * 注：// 这个模块的接口好像有问题喔，暂时没有功能
*/
export default {
    data() {
        return {
            model: {
                stationId:1,
                searchStartDate: '',
                searchEndDate: ''
            },
            list: [],
            result:[],
            showCalendar1: false,
            showCalendar2: false,
            checked: false,
            activeNames: [''],
            stationList:[],
            workHoursRecords:[],
            showWokrHoursDetail:false,
            // stationId:'',
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2030, 0, 31),
        }
    },
    components: {
        TopNav,
        BottomNav,
        ListLayout
    },
    methods: {
        handleSelectAll(e) {
            let className = e.target.className
            if(className.includes('van-checkbox') || className.includes('van-icon-success')) {
                if(this.checked) {
                    this.$refs.checkGroup.toggleAll(false);
                }else {
                    this.$refs.checkGroup.toggleAll(true);
                    console.log(this.result)
                }
            }else if(className.includes('van-button')) {
                this.$dialog.confirm({
                    message: '确定一键确认所有选中工时吗？'
                }).then(() => {
                    this.confirmAll();
                }).catch(() => {})
            }
        },
        async confirmAll(){
            // const res = await this.$ajax.post('/system/api/teacher/workHoursComfirmAll')
            const res = await this.$ajax.post('/system/api/teacher/workHoursComfirmAll',
                this.model);
            this.$toast(res.data.msg);
        },
        checkAll() {
            this.$refs.checkboxGroup.toggleAll(true);
            console.log(this.result);
            },
            toggleAll() {
            this.$refs.checkboxGroup.toggleAll();
            },
        toWorkHoursDetail(item){
            //传参缺少 stationName 
            this.$router.push({path:'/workHoursDetail',query:{item:item,model:this.model}});
        },
        onConfirmStart(date) {
            this.model.searchStartDate = `${date.getFullYear()}-${(date.getMonth() + 1)>9?(date.getMonth() + 1):'0'+(date.getMonth() + 1)}-${(date.getDate())>9?(date.getDate()):'0'+(date.getDate())}`;
            this.showCalendar1 = false;
        },
        onConfirmEnd(date) {
            this.model.searchEndDate = `${date.getFullYear()}-${(date.getMonth() + 1)>9?(date.getMonth() + 1):'0'+(date.getMonth() + 1)}-${(date.getDate())>9?(date.getDate()):'0'+(date.getDate())}`;
            this.showCalendar2 = false;
        },
        //修改工时
        handleChangeTime() {
            this.$router.push('/changeTime')
        },
        handleSubmit() {
            console.log('提交名单')
        },
        async getStationList(){
            const res = await this.$ajax.get('/system/api/teacher/queryTeacherStation')
            res.data.forEach(item => {
                var station ={
                    value : '',
                    text:''
                }
                station.value = item.stationId;
                station.text = item.stationName;
                this.stationList.push(station)
            });
},             //工时状态，0-未确认，1-用工老师已确认，2-审批中，3-审批通过确认
        async getList(param) {
            param = this.model;
            // param测试使用的
            // const param = {beginDate: '2020-04-01', endDate: '2020-05-01'}
            const res = await this.$ajax.get('/system/api/teacher/workHoursRecords',{params: param})
            console.log(res.data)
            if(res.data) {
                this.workHoursRecords = res.data
                this.workHoursRecords.forEach(item => {
                    switch (item.comfirmStatus) {
                        case "0":
                            item.comfirmStatus = "未确认"
                            break;
                        case "1":
                            item.comfirmStatus = "用工老师已确认"
                            break;
                        case "2":
                            item.comfirmStatus = "等待上级审批"
                            break;
                        case "3":
                            item.comfirmStatus = "等待上级审批"
                            break;
                        default:
                            break;
                    }
                });
            }
        }
    },
    beforeRouteLeave(to,from,next){
            from.meta.isBack = true;
            next();
        },
        activated(){
            if(this.$route.meta.isBack){
                var p = this.$route.query.model;
                // console.log(p)
                this.getList(p);
            }
        },
    mounted() {
        this.getStationList()
        // this.getList()
    }
}
</script>

<style scoped>
    .list .van-checkbox {
        margin-left: 10px;
        overflow: visible;
    }
    .dateSelect {
        margin-bottom: 10px;
        background-color: #fff;
        padding: 10px 30px;
    }
    .dateSelect .van-field {
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .dateSelect .van-field>>>.van-icon {
        color: rgb(81, 125, 252);
    }
    .dateSelect .van-field:first-child {
        margin-bottom: 10px;
    }
    .info p {
        font-size: 14px;
        color: #555;
    }
    .list+.van-cell {
        border-top: 1px solid #eee;
        position: fixed;
        bottom: 1;
    }
    .van-cell{
        /* height: 25px; */
        padding: 5px;
    }
    .confirmAllButton{
        margin-right: 5px;
    }
    .ven-cell-bottom {
        border-top: 1px solid #eee;
        position: fixed;
        bottom: 49px;
    }
</style>