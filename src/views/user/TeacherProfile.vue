<template>
    <div class="profile">
        <top-nav title="个人信息" :isShow="false" />
        <div class="avatar">
            <img src="../../assets/image/avatar.png" />
            <span>{{teacherInfo.userName}}</span>
        </div>
        <div class="infoList">
            <van-cell-group>
                <van-cell title="昵称" icon="info-o" :value="teacherInfo.nickName" />
                <van-cell title="性别" icon="contact" :value="teacherInfo.sex"/>
                <van-cell title="电话" icon="phone-o" :value="teacherInfo.phonenumber" />
                <van-cell title="邮件" icon="envelop-o" :value="teacherInfo.email" />
				<van-cell title="部门" icon="home-o" :value="teacherInfo.deptName" />
				<van-cell title="退出登录" @click="logout" icon="warn-o" is-link />
            </van-cell-group>
        </div>
        <bottom-nav :active="6"/>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import BottomNav from '@/components/teacher/BottomNav.vue'
export default {
    data() {
        return {

			teacherInfo: {
			}
        }
    },
    components: {
        TopNav,
        BottomNav
    },
    methods: {
		async getInfo() {
			const res = await this.$ajax.get('/common/getInfo')
			if(res.data.code === 200) { 
				this.teacherInfo = res.data.data
				this.teacherInfo.deptName = res.data.data.dept.deptName
					if(this.teacherInfo.sex === "0"){
						this.teacherInfo.sex = "男"
					}else{
						this.teacherInfo.sex = "女"
					}
				console.log(this.teacherInfo)
			}
		},
		logout () {
			this.$dialog.confirm({
				message: '确认退出吗？'
			}).then(() => {
				sessionStorage.removeItem('token')
				this.$router.push('/login')
			}).catch(() => {})
		}
	},
	mounted() {
		this.getInfo()
	}
}
</script>

<style scoped>
    .avatar {
		display: flex;
		justify-content: center;
		flex-direction: column;
		background-color: white;
		border-bottom: 1px solid #eeeeff;
		height: 100px;
		align-items: center;
	}
	.avatar img {
		margin-bottom: 10px;
		width: 50px;
		height: 50px;
		border: 1px solid #eee;
		border-radius: 50%;
	}
	.avatar span {
		font-size: 14px;
		color: #333;
	}
	.infoList {
		text-align: left;
	}
	.van-cell >>> .van-icon {
		color:  rgb(81, 125, 252);
	}
</style>