<template>
    <div class="employ">
        <top-nav title="我要应聘" :isShow="true" />
        <div class="detail">
            <van-field
            v-model="model.remarks"
            rows="2"
            autosize
            label="空闲时间"
            type="textarea"
            maxlength="500"
            placeholder="请输入空闲时间 例:周五 345 "
            show-word-limit/>
            <div class="button">
                <van-button @click="handleSubmit" size="small" color="rgb(81, 125, 252)">提交</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
    data() {
        return {
            model: {
                remarks: '',
                // spareTime: ''
            },
            toConfirm: false
        }
    },
    components: {
        TopNav
    },
    methods: {
        async handleSubmit() {
            if(!this.model.remarks) {
                this.$toast.fail('输入信息不为空')
                return
            }
            const stationId = parseInt(this.$route.params.stationId)
            this.model.stationId = stationId
            //添加确认是否提交申请
            this.$dialog.confirm({
                message: '确认提交申请吗？'
            }).then(()=>{
                this.toConfirmFunction();
            }).catch(() => {});
        },
        async toConfirmFunction(){
            const res = await this.$ajax.post('/system/api/student/applyJob', this.model)
            // const res = await this.$ajax.post('/system/stationStudent/applyJob', this.model)
            console.log(res.data)
            switch(res.data.code) {
                case 200:
                    this.$toast.success(res.data.msg)
                    this.$router.push("/employment")
                    // this.$toast.success('应聘成功')
                    break;
                case 500:
                    this.$toast.fail(res.data.msg)
                    this.$router.push("/employment")
                    // this.$toast.fail('已应聘该岗位')
                    break;
                default:
                    this.$toast.fail('出错啦')
            }
        }
    }
}
</script>

<style scoped>
.detail {
    box-sizing: border-box;
    width: 90%;
    border: 1px solid #eee;
    box-shadow: 1px 1px 8px rgb(228, 227, 227);
    margin: 10px auto;
    padding: 30px 40px;
    background-color: rgb(247, 248, 250);
    font-size: 14px;
    color: #444;
}

.button {
    position: relative;
    margin-top: 50px;
}

.van-field {
    margin-bottom: 10px;
}
.van-button {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>