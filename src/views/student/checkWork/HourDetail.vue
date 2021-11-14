<template>
    <div class="confirm">
        <top-nav title="工时明细" :isShow="true" />
        <div class="dateSelect">
            <van-dropdown-menu>
                <van-dropdown-item @change="changeStationId(value)" v-model="stationId" :options="option1" />
            </van-dropdown-menu>
            <van-field :border="false" label="起始日期" right-icon="calender-o" readonly clickable name="calendar" :value="model.startDate"  placeholder="点击选择日期" @click="showCalendar1 = true" />
            <van-calendar v-model="showCalendar1" @confirm="onConfirmStart" :min-date="minDate" :max-date="maxDate" :show-confirm="false"/>
            <van-field :border="false" label="终止日期" right-icon="calender-o" readonly clickable name="calendar" :value="model.endDate"  placeholder="点击选择日期" @click="showCalendar2 = true" />
            <van-calendar v-model="showCalendar2" @confirm="onConfirmEnd" :min-date="minDate" :max-date="maxDate" :show-confirm="false"/>
        </div>
        <ul class="list">
            <van-checkbox-group ref="checkGroup" v-model="result">
            <list-layout v-for="item in hoursList" :key="item" :firstLayout="1">
                <van-icon name="contact" size="40" color="rgb(81, 125, 252)" slot="left-icon" />
                <div slot="content">
                    <h4>工作日期：{{item.workDate}}</h4>
                    <div class="info">
                        <p>工作时长：{{item.workMinutes}}min</p>
                        <p>确认状态：{{item.comfirmStatus}}</p>
                        <p>确认工时：{{item.comfirmMinutes}}min({{(item.comfirmMinutes/60).toFixed(1)}}h)</p>
                    </div>
                </div>
            </list-layout>
            </van-checkbox-group>
        </ul>
        <van-cell title="" clickable >
            <template #right-icon>
                <van-button color="rgb(81, 125, 252)" size="mini" @click="searchHoursDetail()">查询</van-button>
            </template>
        </van-cell>
    </div>
</template>

<script>
// 注：这个模块接口有问题，没有功能
import TopNav from '@/components/common/TopNav.vue'
import ListLayout from '@/components/common/ListLayout.vue'
export default {
    data() {
        return {
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
        }
    },
    components: {
        TopNav,
        ListLayout
    },
    methods: {
        getHoursList(){
            this.hoursList = this.$route.query.hoursList;
        },
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
                this.option1 = this.option1.filter(function(item,index,self){
                    return self.findIndex(el=>el.value==item.value)===index
                    })
             }else{
                 console.log("error");
             }
         },
        async searchHoursDetail(){
            const res = await this.$ajax.get('/system/api/student/workHoursRecords',
            {params :{
                searchStartDate : this.model.startDate,
                searchEndDate : this.model.endDate,
                stationId : this.stationId,
            }}
            )
            this.hoursList = res.data;
            this.hoursList.forEach(item => {
                switch (item.comfirmStatus) {
                    case "0":
                        item.comfirmStatus = "未确认"
                        break;
                    case "1":
                        item.comfirmStatus = "用工老师已确认"
                        break;
                    case "2":
                        item.comfirmStatus = "用工老师已确认"
                        break;
                    case "3":
                        item.comfirmStatus = "用工老师已确认"
                        break;
                    default:
                        break;
                }
            });

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
        this.getStationList();
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
        bottom: 0;
    }
</style>