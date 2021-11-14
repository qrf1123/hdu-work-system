<template>
    <div>
        <top-nav title="签到签退记录" :isShow="true" />
        <div class="dateSelect">
            <!-- <van-field  :border="false" label="查询岗位" right-icon="calender-o" readonly clickable  name="stationId" :value="stationId" placeholder="请选择查询岗位" @click="showStationId = true"/>
            <van-picker v-model="showStationId" title="查询岗位"  :columns="columns" @confirm="onConfirmStationId" /> -->
            <van-dropdown-menu >
                <van-dropdown-item @change="changeStationId(value)" v-model="stationId"  :options="option1" />
            </van-dropdown-menu>
            <van-field :border="false" label="起始日期" right-icon="calender-o" readonly clickable name="calendar" :value="model.startDate"  placeholder="点击选择日期" @click="showCalendar1 = true" />
            <van-calendar v-model="showCalendar1" @confirm="onConfirmStart" :min-date="minDate" :max-date="maxDate" :show-confirm="false"/>
            <van-field :border="false" label="终止日期" right-icon="calender-o" readonly clickable name="calendar" :value="model.endDate"  placeholder="点击选择日期" @click="showCalendar2 = true" />
            <van-calendar v-model="showCalendar2" @confirm="onConfirmEnd" :min-date="minDate" :max-date="maxDate" :show-confirm="false"/>
        </div>
        <ul class="list">
            <list-layout :firstLayout="1" v-for="(item,index) in list" :key="index">
                <van-icon size="40" color="rgb(81, 125, 252)" name="clock-o" slot="left-icon"/>
                <div slot="content">
                    <h4>{{stationName}}</h4>
                    <div>
                        <span>是否补签:{{(item.resignStatus) === "0"?"否":"是"}}</span>
                        <span>{{item.signStatus === "1"?"签到时间":"签退时间"}}:{{(item.signTime).slice(0,10)+ " " +(item.signTime).slice(11,19)}}</span>
                        <!-- <span>用工老师{{item.teacher}}</span>
                        <span>考勤时间：{{item.signTime}}</span> -->
                    </div>
                </div>
            </list-layout>
        </ul>


        <van-cell class="bottomBtn" title="" clickable >
            <template #right-icon>
                <van-button color="rgb(81, 125, 252)" size="mini" @click="signRecords()">查询</van-button>
            </template>
        </van-cell>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import ListLayout from '@/components/common/ListLayout.vue'
export default {
    data() {
        return {
            list: [],
            model: {
                startDate: '',
                endDate: ''
                
            },
            option1: [
                // { text: '选择部门',value : 0},
            ],
            showCalendar1: false,
            showCalendar2: false,
            checked: false,
            result: [],
            hoursList:'',
            showStationId:false,
            stationId : 1,
            // 这个后续再改正吧
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2030, 0, 31),
            stationIds:[],
            stationName:'',
        }
    },
    components: {
        ListLayout,
        TopNav

    },
    methods: {
         async getStationList(){
             const res = await this.$ajax.get('/system/api/student/getMyStations')
             if(res.data.code === 200 ){
                res.data.data.forEach(item => {
                    var temp = {
                        text:'',
                        value:''
                    }
                    temp.text = item.stationName;
                    temp.value = item.stationId;
                    this.option1.push(temp);
                });
                //对象数组去重
                this.option1 = this.option1.filter(function(item,index,self){
                    return self.findIndex(el=>el.value==item.value)===index
                    })
                // this.option1 = [...new Set(this.choices)];
                console.log("my stations" + this.option1[1].value);
             }else{
                 console.log("error");
             }
         },
         async signRecords(){
            const res = await this.$ajax.get('/system/api/student/signRecords',
            {params :{
                searchStartDate : this.model.startDate,
                searchEndDate : this.model.endDate,
                stationId : this.stationId,
            }}
            )
            console.log(res.data.data);
            this.list = res.data.data;
            this.stationName = res.data.stationNames
        },
        onConfirmStart(date) {
            this.model.startDate = `${date.getFullYear()}-${(date.getMonth() + 1)>9?(date.getMonth() + 1):'0'+(date.getMonth() + 1)}-${(date.getDate())>9?(date.getDate()):'0'+(date.getDate())}`;
            this.showCalendar1 = false;
        },
        onConfirmEnd(date) {
            this.model.endDate = `${date.getFullYear()}-${(date.getMonth() + 1)>9?(date.getMonth() + 1):'0'+(date.getMonth() + 1)}-${(date.getDate())>9?(date.getDate()):'0'+(date.getDate())}`;
            this.showCalendar2 = false;
        },
        changeStationId(value){
            this.stationId = value.value;
        }
    },
    mounted() {
        this.getStationList()
    }
}
</script>

<style scoped>
.list li .van-col--15 div span{
    border-right: none;
    display: block;
}
.bottomBtn {
        border-top: 1px solid #eee;
        position: fixed;
        bottom: 0;
    }
</style>