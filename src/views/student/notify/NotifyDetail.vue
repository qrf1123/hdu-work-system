<template>
    <div class="notify-detail">
        <top-nav title="公告详情" :isShow="true" />
        <div class="detail">
            <header>{{detail.noticeTitle}}</header>
            <p v-html="detail.noticeContent">{{detail.noticeContent}}</p>
            <footer>
                <span>发布人：{{detail.author}}</span>
                <span>发布日期：{{detail.publishDate}}</span>
            </footer>
        </div>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
    data() {
        return {
            detail: {}
        }
    },
    components: {
        TopNav
    },
    methods: {
        async getDetail() {
            const res = await this.$ajax.get('/system/notice/noticeDetails?noticeId='+this.$route.query.noticeId)
            if(res.data.code === 200) {
                this.detail = res.data.data
                console.log(this.detail)
            }
        }
    },
    mounted() {
        this.getDetail()
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
    background-color: white;
}

header {
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: bold;
    color: #333;
}

p {
    font-size: 14px;
    text-indent: 2em;
    color: #555;
    line-height: 20px;
}

footer {
    position: relative;
    font-size: 12px;
    color: rgb(122, 121, 121);
    margin-top: 80px;
}

footer span {
    width: 70%;
}

footer span:nth-child(1) {
    position: absolute;
    right: 0;
    bottom: 20px;
}

footer span:nth-child(2) {
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>