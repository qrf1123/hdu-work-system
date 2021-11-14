<template>
    <van-tab title="应聘岗位">
        <my-filter @reset="getList" @handleSubmit="handleSubmit" ref="filter" />
        <!-- <my-filter @reset="getList" @changeCategory="handleCategory" ref="filter" /> -->
        <van-row>
            <van-col span="9">
                <search placeholder="岗位主题" @search="handleSearch"/>
            </van-col>
            <van-col span="9">
                <dropdown-menu @changeValue="handleChange"/>
            </van-col>
            <van-col span="6">
                <van-button color="rgb(81, 125, 252)" @click="$refs.filter.show = true" icon="filter-o" size="small">筛选</van-button>
            </van-col>
        </van-row>
        <ul v-if="list.length" class="list">
            <li v-for="(item,index) in list" :key="index" @click="handleClick($event,item.stationId)">
                <div class="left">
                    <h4 style="color:#0040FF">{{item.stationName}}</h4>
                    <p>用工老师：{{item.stationTeacher}}</p>
                    <!-- 贫困生可见 -->
                    <p v-if="staffPass === 1?true:false">已有人数：{{item.usedTotalNum}} / {{item.totalNum}}</p>
                    <!-- <p v-if="staffPass === 1?true:false">已有人数：{{item.usedNonpoorNum+item.usedPoorNum}} / {{item.totalNum}}</p> -->
                    <!-- 非贫可见 -->
                    <p v-if="staffPass === 0?true:false">已有人数：{{item.usedNonpoorNum}} / {{item.nonpoorNum}}</p>
                </div>
                <div class="right">
                    <p>{{item.workStartTime}}</p>
                    <van-button color="rgb(81, 125, 252)" size="mini">我要应聘</van-button>
                </div>
            </li>
        </ul>
        <p class="tip" v-else>暂无岗位信息~</p>
    </van-tab>
</template>

<script>
import Search from '@/components/common/Search.vue'
import DropdownMenu from '@/components/common/DropdownMenu.vue'
import MyFilter from './Filter'
// import axios from 'axios'
// import Qs from 'qs'
export default {
    data() {
        return {
            list: [],
            staffPass:''
            // orderBy: 0,
            // category: 0
        }
    },
    components: {
        Search,
        DropdownMenu,
        MyFilter
    },
    methods: {
        handleSearch(val) {
            console.log(val);
        },
        handleChange(value) {
            this.orderBy = value
            if(this.category) {
                this.handleCategory(this.category)
            }else {
                this.getList()
            }
        },
        async handleSubmit(cat,dept){
            const res = await this.$ajax.get('/system/api/student/getStationList',
            { params:{
                deptIdList:dept,
                stationTypeList : cat,
                stationName : ''
            }})
            if(res.data.code === 200){
                this.list = res.data.data;
                this.list.forEach(item => {
                    item.workStartTime = item.workStartTime.slice(0,10);
                });
                console.log(res);
                this.$refs.filter.show = false
            }else{
                this.$emit.error("查询出错了请重试～");
            }
        },
        handleClick(e,stationId) {
            if(e.target.nodeName === 'BUTTON') {
                this.$router.push({name: 'Employ', params: {stationId: stationId}})
            }else {
                this.$router.push({name: 'JobDetail', params: {stationId: stationId}})
            }
        },
        async getList(param = `/system/api/student/getStationList`) {
            const resStation = await this.$ajax.get(param)
            if(resStation.data.code === 200) {
                console.log(resStation.data.data);
                this.list = resStation.data.data;
                this.list.forEach(item => {
                    item.workStartTime = item.workStartTime.slice(0,10);
                });
            }
        }
    },
    mounted(){
        this.getList()
        this.staffPass = sessionStorage.getItem('staffPass').slice(1,2)-0;
        console.log(this.staffPass);
    }
}
</script>

<style scoped>
.van-row .van-col--9:nth-child(2){
    margin-top: 10px;
    padding-left: 1px;
}
.van-col--9 .van-search {
    height: 36px;
    padding: 3px;
}
.van-col--6 .van-button {
    margin-top: 13px;
    margin-left: 20px;
}
.van-dropdown-menu >>> .van-dropdown-menu__bar {
    height: 36px;
    box-shadow: 0 0 0 #fff;
}
.list {
    margin-bottom: 60px;
}
.list li {
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
    box-shadow: 1px 1px 5px #eef;
    background-color: #fff;
    display: flex;
}
.list .left {
    width: 80%;
}
.list .right {
    position: relative;
    text-align: right;
    width: 20%;
}
.list li h4 {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
}
.left p {
    font-size: 14px;
    color: #444;
}
.right p {
    position: absolute;
    top: 5px;
    right: 0;
    color: gray;
    font-size: 12px;
}
.right .van-button {
    position: absolute;
    right: 0;
    bottom: 3px;
}
p.tip {
    text-align: center;
    font-size: 16px;
    color: #333;
}
</style>