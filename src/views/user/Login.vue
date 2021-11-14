<template>
    <div class="login">
        <top-nav title="登录" :isShow="false" />
        <div class="logo">
            <img src="@/assets/image/logo-hdu.png" alt="logo for school" />
            <span>杭州电子科技大学</span>
        </div>
        <van-form @submit="login">
            <van-field :border="false" v-model="model.username" label="用户名" placeholder="请输入学号/工号" left-icon="user-o" clearable/>
            <van-field :border="false" v-model="model.password" type="password" placeholder="请输入密码" label="密码" left-icon="lock" clearable/>
            <div class="checked">
                <a>忘记密码？</a>
                <van-checkbox v-model="checked" shape="square"><a @click="showBook">温馨提示</a></van-checkbox>
            </div>
            <van-button round block color="rgb(81, 125, 252)" native-type="submit">
                登录
            </van-button>
        </van-form>

      
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
    data() {
        return {
            model: {
                username: '',
                password: ''
            },
            checked: false
        }
    },
    components: {
        TopNav
    },
    methods: {
        async login() {
            if(this.checked) {
                // const resLogin = await this.$ajax.post('/apiLogin',this.model)
                const resLogin = await this.$ajax.post('/common/apiLogin',this.model)
                if(resLogin.data.code === 200) {
                    console.log(resLogin.data.token);
                    sessionStorage.setItem('token',resLogin.data.token)
                }else {
                    this.$toast.fail(resLogin.data.msg)
                }
                const resInfo = await this.$ajax.get('/common/getInfo')
                // const resInfo = await this.$ajax.get('/getInfo')
                if(resInfo.data.code === 200) {
                    console.log(resInfo.data.data.staffType);
                    sessionStorage.setItem('roles', JSON.stringify(resInfo.data.data.staffType))
                    sessionStorage.setItem('staffAuth1', JSON.stringify(resInfo.data.data.staffAuth1))
                    sessionStorage.setItem('staffAuth2', JSON.stringify(resInfo.data.data.staffAuth2))
                    sessionStorage.setItem('staffPass', JSON.stringify(resInfo.data.data.staffPass))
                    sessionStorage.setItem('deptId', JSON.stringify(resInfo.data.data.deptId))
                    sessionStorage.setItem('deptType', JSON.stringify(resInfo.data.deptType))
                    this.$toast.success({message: '登陆成功',duration: 1000})
                }
                setTimeout(() => {
                    let role = sessionStorage.getItem('roles')
                    // if(role && role.includes('学生')){
                    if(role && role.includes('1' || '3')){ //1-本科生 3-研究生
                        this.$router.push('/employment')
                    }else if(role && role.includes('2')){
                        this.$router.push('/message')
                    }else {
                        this.$toast.fail('角色不存在!')
                    }
                },1000)
            }else {
                this.$toast('请勾选温馨提示')
            }
        },
        showBook (){
            // let arr = ['测试一', '测试二', '测试三'];
            // let str = arr.join(' <br/> ');
        //     this.$message({
        //         message: str,
        //         type: 'warning'
        // });
            this.$dialog.alert({
                dangerouslyUseHTMLString: true,
                title: '温馨提示',
                // message: '&emsp;&emsp;这几天，中国的一些中小学生们正在创造“奇迹”，在极为有限的几天时间里补齐一整个假期的作业，这也因此成了不少人不愿面对开学的理由之一。</br>&emsp;&emsp;不过，杭州萧山区的中小学生们奋笔疾书的手似乎可以停一停。23日，杭州萧山区教育局发通知称，全区中小学生寒假作业不作硬性规定必须完成，允许开学后在教师指导或同伴互助下延期完成。紧接着第二天，和作业相关的又一个话题也上了热搜。“小学一二年级不布置书面家庭作业，初中家庭作业完成时间不超过90分钟……”距离春季学期开学还剩不到一周时间，陕西省教育厅23日印发的《陕西省义务教育学校课程与教学管理指南》引起网友关注。文件不仅给家庭作业划定“红线”，还明确“教师不得直接或变相要求学生家长代为评改作业”。今年2月23日教育部召开的发布会上也强调，不得给家长布置或变相布置作业，不得要求家长检查、批改作业。这把广大家长从改作业的“苦海”中解救了出来，被一些网友视为给家长和学生的“开学福利”。不仅如此，教育部还要求各地要提高课后服务水平，每个学校都要做起来，在时间安排上，要与当地正常下班时间相衔接，切实解决家长接学生困难问题。即将从压力中“解放”的学生和家长们，在迎接新学期到来时，想必会轻松不少。',
                message: '按照教育部文件，学生参加勤工助学的工作时间，一个月原则上不能超过40个小时。</br></br>请同学们及时申报、核实自己的工时数。</br></br>请用工部门及时审核用工情况',
                messageAlign:'left'
                }).then(() => {
                // on close
                });
        }
    }
}
</script>

<style scoped>
    .logo {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .logo img {
        height: 130px;
        width: 130px;
        border-radius: 50%;
        margin-top: 50px;
    }
    .logo span {
        font-size: 14px;
        margin-top: 10px;
        margin-bottom: 30px;
    }

    .van-form {
        padding: 0 20px;
    }
    .van-form .van-field {
        margin-bottom: 10px;
        border: 1px solid #eee;
        border-radius: 3px;
    }
    .checked {
        color: #323233;
        display: flex;
        justify-content: space-between;
        padding: 10px 5px;
        font-size: 14px;
    }
</style>