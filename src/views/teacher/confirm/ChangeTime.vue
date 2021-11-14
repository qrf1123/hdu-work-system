<template>
    <div class="changeTime">
        <top-nav title="修改工时" :isShow="true" />
        <div class="detail">
            <van-form @submit="onSubmit">
                <van-field v-model="model.stuNo" label="学号" rows="1" autosize clearable type="textarea" placeholder="学号"/>
                <van-field v-model="model.name" label="姓名" rows="1" autosize clearable type="textarea" placeholder="姓名"/>
                <van-field label="开始日期" right-icon="calender-o" readonly clickable name="calendar" :value="model.startDate"  placeholder="点击选择日期" @click="showCalendar1 = true"/>
                <van-calendar v-model="showCalendar1" @confirm="onConfirmStart" :show-confirm="false"/>
                <van-field label="结束日期" right-icon="calender-o" readonly clickable name="calendar" :value="model.endDate"  placeholder="点击选择日期" @click="showCalendar2 = true"/>
                <van-calendar v-model="showCalendar2" @confirm="onConfirmEnd" :show-confirm="false"/>
                <van-field v-model="model.oldTime" disabled label="原工时" rows="1" autosize clearable type="textarea"/>
                <van-field v-model="model.newTime" label="修改工时" rows="1" autosize clearable type="textarea" placeholder="修改工时"/>
                <p>
                    <van-button size="small" native-type="submit" color="rgb(81, 125, 252)">确定修改</van-button>
                </p>
            </van-form>
        </div>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
    data() {
        return {
            model: {
                startDate: '',
                endDate: '',
                stuNo: '',
                name: '',
                oldTime: '2h',
                newTime: ''
            },
            showCalendar1: false,
            showCalendar2: false
        }
    },
    components: {
        TopNav
    },
    methods: {
        onConfirmStart(date) {
            this.model.startDate = `${date.getMonth() + 1}/${date.getDate()}`;
            this.showCalendar1 = false;
        },
        onConfirmEnd(date) {
            this.model.endDate = `${date.getMonth() + 1}/${date.getDate()}`;
            this.showCalendar2 = false;
        },
        onSubmit() {
            console.log(this.model)
        }
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
    p {
        margin-top: 10px;
        text-align: right;
    }
    .van-field >>> .van-icon {
        color: rgb(81, 125, 252);
    }
</style>