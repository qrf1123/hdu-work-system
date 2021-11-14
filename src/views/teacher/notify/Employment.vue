<template>
    <div class="notify">
        <!-- <dropdown-menu @changeValue="handleChange"/> -->
        <!-- <search placeholder="请输入公告主题" @search="handleSearch" /> -->
        <ul class="list">
            <list-layout  :firstLayout="1" v-for="(item,index) in list" :key="index">
                <van-icon size="40" color="rgb(81, 125, 252)" name="bullhorn-o" slot="left-icon"/>
                <div slot="content">
                    <h4>{{item.noticeTitle}}</h4>
                    <div>
                        <span>发布者：{{item.author}}</span>
                    </div>
                </div>
                <div slot="right">
                    <span class="date">{{item.publishDate}}</span>
                    <van-button @click="handleDetail(item.noticeId)" size="mini" color="rgb(81, 125, 252)">查看</van-button>
                </div>
            </list-layout>
        </ul>
    </div>
</template>

<script>
// import Search from '@/components/common/Search.vue'
// import DropdownMenu from '@/components/common/DropdownMenu.vue'
import ListLayout from '@/components/common/ListLayout.vue'
export default {
    data() {
        return {
            readStatus: {
                all: 1, //全部 默认状态
                read: 0, //未读
                readed: 0 //已读
            },
            list: []
        }
    },
    components: {
        // Search,
        // DropdownMenu,
        ListLayout
    },
    methods: {
        handleSearch(searchVal) {
            console.log(searchVal)
        },
        handleChange(value) {
            console.log(value)
            switch (value) {
                case 0:
                    this.readStatus = {
                        all: 1,
                        read: 0,
                        readed: 0
                    }
                    break
                case 1:
                    this.readStatus = {
                        all: 0,
                        read: 1,
                        readed: 0
                    }
                    break
                case 2:
                    this.readStatus = {
                        all: 0,
                        read: 0,
                        readed: 1
                    }
                    break
                default:
                    this.readStatus = {
                        all: 1,
                        read: 0,
                        readed: 0
                    }
                    break
            }
        },
        handleDetail(noticeId) {
            this.$router.push({
                path: "/notifyDetail",
                query: {noticeId: noticeId}
            })
        },
        async getList() {
            const res = await this.$ajax.get('/system/notice/noticeList?noticeType=1')
            if(res.data.code === 200) {
                this.list = res.data.data.data
            }
            console.log(res.data)
        }
    },
    mounted() {
        this.getList()
    }
}
</script>