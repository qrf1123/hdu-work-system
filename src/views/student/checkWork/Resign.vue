<template>
    <div class="resign">
        <top-nav title="补签" :isShow="true" />
        <clock />
        <div class="signForm">
            <h4>补签</h4>
            <van-form >
                <van-field right-icon="calender-o"
                readonly
                clickable
                name="datetimePicker"
                :value="this.model1.signTime"
                label="签到签退补录"
                placeholder="签到签退补录时间"
                @click="showPicker1 = true"/>

                <van-popup v-model="showPicker1" position="bottom">
                    <van-datetime-picker
                    type="datetime"
                    title="年-月-日-时-分"
                    :min-date="new Date(2020, 0, 1)"
                    @confirm="onConfirmStart"
                    @cancel="showPicker1 = false"/>
                </van-popup>

                
            </van-form>
            <van-button round  color="rgb(81, 125, 252)" size="mini" style="width:100px;height : 30px" @click="resign(1)">
                    补签到
                </van-button>
                <van-button round  color="rgb(81, 125, 252)" size="mini" style="width:100px;height : 30px" @click="resign(2)">
                    补签退
                </van-button>
        </div>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import Clock from '@/components/common/Clock.vue'
function formatDate(timeStamp) {
    var date = new Date(timeStamp)
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month > 9 ? month : '0' + month
    let day = date.getDate()
    day = day > 9 ? day : '0' + day
    let hour = date.getHours()
    hour = hour > 9 ? hour : '0' + hour
    let minute = date.getMinutes()
    minute = minute > 9 ? minute : '0' + minute
    let second = date.getSeconds()
    second = second > 9 ? second : '0' + second
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`

}
function formatWorkDate(timeStamp){
    var date = new Date(timeStamp)
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month > 9 ? month : '0' + month
    let day = date.getDate()
    day = day > 9 ? day : '0' + day
    return `${year}-${month}-${day}`
}
export default {
    data() {
        return {
            //签到
            model1: {
                // 请求数据的参数看不明白
                stationId:'',
                workDate:'',
                signTime:'',
                signStatus:"1",
                resignStatus:"1"
            },
            //签退
            model2: {
                // 请求数据的参数看不明白
                stationId:'',
                workDate:'',
                signTime:'',
                signStatus:"2",
                resignStatus:"1"
            },
            showPicker1: false,
            // showPicker2: false,
            // signTime:'',
            // stationId:''
        }
    },
    components: {
        TopNav,
        Clock
    },
    methods: {
        async resign(s) {
            this.model1.stationId = parseInt(this.$route.query.stationId)
            this.model2.stationId = parseInt(this.$route.query.stationId)
            var res = ''
            if(s === 1){
                res = await this.$ajax.post('/system/api/student/signInOut', this.model1)
                // console.log(res.data)
            }
            if(s === 2){
                 res = await this.$ajax.post('/system/api/student/signInOut', this.model2)
            }
            if(res.data.code === 200) {
                this.$toast(res.data.msg)
               
            }else {
                this.$toast(res.data.msg)
            }
        },
        onConfirmStart(time) {
            const timeStamp = time.getTime()
            this.model1.signTime = formatDate(timeStamp)
            this.model1.workDate = formatWorkDate(timeStamp)
            this.model2.signTime = formatDate(timeStamp)
            this.model2.workDate = formatWorkDate(timeStamp)
            this.showPicker1 = false;
        },
    }
}
</script>

<style scoped>
    .signForm {
        background-color: white;
        padding: 20px;
    }
    .signForm h4 {
        text-align: center;
        margin-bottom: 10px;
    }
    .van-form .van-field {
        text-align: left;
    }
    .van-form .van-button {
        width: 90%;
        margin: 15px auto 0;
    }
    .van-field >>> .van-icon {
        color: rgb(81, 125, 252);
    }
</style>