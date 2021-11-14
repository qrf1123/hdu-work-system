<template>
    <van-tab title="信息通知">
        <ul>
            <van-list v-model="loading" :finished="finished" finished-text="加载完成!!!" >
            <!-- <van-list v-model="loading" :finished="finished" finished-text="加载完成!!!" @load="onLoad"> -->
                <li v-for="(item,index) in messageList" :key="index">
                    <p>
                        <span>{{item.updateTime}}</span>
                        <!-- <span>{{item.operDate}}</span> -->
                    </p>
                    <div class="content">
                        {{`您的"${item.flowName}"用工需求"${item.flowState}"`}}
                        <!-- {{`您的 "第一条用工申请" 用工需求已发布`}} -->
                    </div>
                </li>
            </van-list>
        </ul>
    </van-tab>
</template>

<script>
export default {
    data() {
        return {
            messageList: [],
            pageNum: 1,
            loading: false,
            finished: false
        }
    },
    methods: {
        
        async getMessage() {
            const res = await this.$ajax.get('/system/flows/queryMyFlows')
            console.log(res.data.data)
            if(res.data.code === 200) {
                this.finished = true
                res.data.data.forEach(item => {
                    // console.log(item.updateTime)
                    if(item.updateTime){
                        const updateTime1 = item.updateTime.slice(0,10);
                        const updateTime2 = item.updateTime.slice(11,19);
                        item.updateTime = updateTime1 + ' ' + updateTime2
                        this.messageList.push(item);
                    }
                });
                this.messageList.forEach(item => {
                    switch (item.flowState) {
                        case "1":
                            item.flowState = "已通过审批"
                            break;
                        case "2":
                            item.flowState = "已删除"
                            break;
                        case "3":
                            item.flowState = "审批中"
                            break;
                        case "4":
                            item.flowState = "被驳回"
                            break;
                        default:
                            break;
                    }
                });
                console.log(this.messageList);
            }else{
                this.$message.error("获取列表失败～");
            }
        }
    },
    mounted() {
        this.getMessage()
    }
}
</script>

<style scoped>
    ul {
        margin-bottom: 60px;
    }
    li {
        margin-bottom: 15px;
    }
    li .content {
        width: 90%;
        box-sizing: border-box;
        margin: 15px auto;
        background-color: #fff;
        font-size: 14px;
        color: #555;
        border-radius: 8px;
        border: 1px solid #eee;
        text-align: center;
        padding: 15px 10px;
    }
    li p {
        display: flex;
        justify-content: space-around;
        width: 50%;
        background-color: rgb(251, 251, 251);
        margin: 20px auto 0;
        height: 25px;
        line-height: 25px;
        color: #666;
        border-radius: 10px;
        font-size: 12px;
        border: 1px solid #eee;
    }

</style>