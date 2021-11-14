<template>
    <div class="manual">
        <top-nav title="手动录入" :isShow="true" />
        <div class="detail">
            <van-form @submit="onSubmit">
                <van-field v-model="model.stuNo" label="学号" rows="1" autosize clearable type="textarea" placeholder="学号"/>
                <van-field v-model="model.name" label="姓名" rows="1" autosize clearable type="textarea" placeholder="姓名"/>
                <van-field name="radio" label="性别">
                    <template template #input>
                        <van-radio-group v-model="model.gender" direction="horizontal">
                            <van-radio name="男">男</van-radio>
                            <van-radio name="女">女</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="model.academy" label="学院" rows="1" autosize clearable type="textarea" placeholder="学院"/>
                <van-field name="radio" label="是否贫困生">
                    <template #input>
                        <van-radio-group v-model="model.isPoor" direction="horizontal">
                            <van-radio name="是">是</van-radio>
                            <van-radio name="否">否</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <p>
                    <van-button size="small" native-type="submit" color="rgb(81, 125, 252)">确定录入</van-button>
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
                stuNo: '',
                name: '',
                gender: '',
                academy: '',
                isPoor: ''
            }
        }
    },
    components: {
        TopNav
    },
    methods: {
        onSubmit() {
            console.log(this.model)
        },
        async searchStudent() {
            const res = await this.$ajax.get(`/system/user?userId=${102}`)
            console.log(res.data)
        }
    },
    mounted() {
        this.searchStudent()
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
        text-align: right;
        margin-top: 10px;
    }
</style>