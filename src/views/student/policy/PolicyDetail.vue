<template>
    <div class="notify-detail">
        <top-nav title="文件详情" :isShow="true" />
        <div class="detail">
            <header>政策详情:</header>
            <p v-html="detail.noticeContent"></p>
            <!-- <van-cell style="margin-top: 50px; width: 70%;float : right;" title="浏览附件" is-link url="http://hdqg.hdu.edu.cn/resource/upload/2021/04/07/8c63bc1f1839b259e879709edcd22ef3.jpg" /> -->
            <footer>
                <!-- <span>在线浏览附件</span> -->
                <span>发布人：{{detail.author}}</span>
                <span >发布日期：{{detail.publishDate}}</span>
            </footer>
            <div class="footerdiv">
                <van-button v-if="showUrlButton" color="rgb(81, 125, 252)" size="mini" :url="fileURl">附件</van-button>
                <!-- <van-button @click="downLoadFile()" color="rgb(81, 125, 252)" size="mini">附件</van-button> -->
                <!-- <van-button @click="downLoadFile()" color="rgb(81, 125, 252)" size="mini">附件</van-button> -->
            </div>

        </div>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
    data() {
        return {
            detail: {
                person: '',
                content: '',
                date: ''
            },
            fileURl:'',
            showUrlButton :false
        }
    },
    components: {
        TopNav
    },
    methods: {
        async fileDetail(){
            const res = await this.$ajax.get('/system/notice/noticeDetails',{params:{noticeId : this.$route.query.item.noticeId}})
            if(res.data.code === 200) {
                this.detail = res.data.data
                if(this.detail.publishNoticeFilesRespVoList.length != 0){
                    this.fileURl = this.detail.publishNoticeFilesRespVoList[0].fileUrl;
                    this.showUrlButton = true;
                    console.log(this.fileURl)
                }
            }
        },
        downLoadFile(){
            console.log("下载文件啦~");
        }
    },
    mounted() {
        this.fileDetail()
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
    color: #222;
}

p {
    letter-spacing: 0.5px;
    font-size: 14px;
    text-indent: 2em;
    color:#333;
    line-height: 20px;
}
footer .van-button {
    width: 20px;
    margin: 0 auto;
}
footer {
    position: relative;
    font-size: 12px;
    color: rgb(122, 121, 121);
    margin-top: 20px;
    padding-bottom: 30px;
    
}
.footerdiv{
    position: relative;
    font-size: 12px;
    margin-top: 30px;
    margin-left: 70%;
}

footer span {
    width: 70%;
    margin-top: 30px;

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