<template>
    <div class="profile">
        <top-nav title="个人信息" :isShow="false" />
        <div class="avatar">
            <img src="../../assets/image/avatar.png" />
            <span>{{studentInfo.userName}}</span>
        </div>
        <div class="infoList">
            <van-cell-group>
                <van-cell title="昵称" icon="bulb-o" :value="studentInfo.nickName" />
                <van-cell title="性别" icon="contact" :value="studentInfo.sex" />
                <van-cell title="部门" icon="aim" :value="studentInfo.deptName" />
				<van-cell title="电话" icon="phone-o" :value="studentInfo.phonenumber || '无'" />
				<van-cell title="邮箱" icon="envelop-o" :value="studentInfo.email || '无'" />
                <van-cell title="退出登录" @click="logout" icon="warn-o" is-link />
            </van-cell-group>
        </div>
        <bottom-nav :active="4"/>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import BottomNav from '@/components/common/BottomNav.vue'
export default {
    data() {
        return {
			studentInfo: {
				
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
				this.studentInfo = res.data.data
				this.studentInfo.deptName = res.data.data.dept.deptName

					if(this.studentInfo.sex === "0"){
						this.studentInfo.sex = "男"
					}else{
						this.studentInfo.sex = "女"
					}
				console.log(this.studentInfo)
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
		color: rgb(81, 125, 252);
	}
</style>