<template>
    <div class="clock">
            <van-icon size="40" name="todo-list-o" color="rgb(81, 125, 252)"/>
            <span>
                工时明细查询<van-icon name="arrow" @click="$router.push('/hourDetail')" /><br>
            </span>
            <span>
                考勤记录查询<van-icon name="arrow" @click="$router.push('/record')" />
            </span>
    </div>
</template>

<script>
export default {
    name: "clock",
        //1.页面向组件传参
        props:{
            stationId:Number
        },
    data(){
        return{
            sturdyTotalTime:0,
            // hoursList : {},
        }
    
    },
    methods:{
        getNowMonth(){
            var data = new Date();
            var month =data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
            const nowMouth = data.getFullYear() + "-" + month ;
            return nowMouth;
        },
        getNowMonthDays(){
            var data = new Date();
            const days = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate();
            console.log(days);
            return days;
        },
    },
    mounted(){
    }
}
</script>

<style scoped>
    .clock {
        margin-bottom: 10px;
        width: 90%;
        height: 150px;
        border: 1px solid #eee;
        box-shadow: 1px 1px 8px rgb(228, 227, 227);
        background-color: white;
        margin: 20px auto;
        text-align: center;
    }
    .clock > .van-icon {
        margin-top: 25px;
    }
    .clock span {
        position: relative;
        margin-top: 10px;
        display: block;
        color: #555;
        font-size: 14px;
    }
    .clock span .van-icon {
        position: absolute;
        top: 3px;
        margin-left: 15px;
    }
</style>