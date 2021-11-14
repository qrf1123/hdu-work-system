<template>
    <div>
        <top-nav :title="title" :isShow="true" />
        <van-form @submit="onSubmit">
            <van-field required disabled readonly v-if="false" v-model="flowID" label="流程ID" rows="1"  type="digit" />
            <van-field required v-model="model.flowName" label="流程标题" rows="1" autosize clearable type="textarea" placeholder="学院/部门+教师全名+工号" error-message="学院/部门+教师全名+工号"/>
            <van-field required disabled v-if="false"  label="流程类型" rows="1"   type="text" placeholder="用工申请"/>
            <van-field required name="radio" label="学生类别">
                <template #input>
                    <van-radio-group v-model="studentType" direction="horizontal">
                        <van-radio name="1">本科生</van-radio>
                        <van-radio name="2">研究生</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field v-if="studentType == 1?true:false" required readonly clickable name="pickerStationType1" :value="value2" label="岗位类别" placeholder="点击选择岗位类型" @click="showPickerStationType1 = true"/>
            <van-popup v-model="showPickerStationType1" position="bottom">
                <van-picker show-toolbar :columns="stationTypes1" @confirm="onConfirmStationType" @cancel="showPickerStationType1 = false"/>
            </van-popup>
            <van-field v-if="studentType == 2?true:false" required readonly clickable name="pickerStationType2" :value="value2" label="岗位类别" placeholder="点击选择岗位类型" @click="showPickerStationType2 = true"/>
            <van-popup v-model="showPickerStationType2" position="bottom">
                <van-picker show-toolbar :columns="stationTypes2" @confirm="onConfirmStationType" @cancel="showPickerStationType2 = false"/>
            </van-popup>
            <!-- 本科生的岗位 输入 岗位名称 -->
            <van-field v-if="studentType == 1 ? true : false " required v-model="model.flowData.stationName" label="岗位名称" rows="1" autosize clearable type="textarea" placeholder="岗位名称"/>

            <!-- 研究生的岗位名称 四选一 -->

            <van-field v-if="studentType == 2?true:false" required readonly clickable name="pickerStationName" :value="value3" label="岗位名称" placeholder="点击选择岗位名称" @click="showPickerStationName = true"/>
            <van-popup v-model="showPickerStationName" position="bottom">
                <van-picker show-toolbar :columns="stationNames" @confirm="onConfirmStationName" @cancel="showPickerStationName = false"/>
            </van-popup>

            <van-field required readonly clickable name="picker1" :value="value1" label="用工学期" placeholder="点击选择学期" @click="showPicker1 = true"/>
            <van-popup v-model="showPicker1" position="bottom">
                <van-picker show-toolbar :columns="terms" @confirm="onConfirmTerm" @cancel="showPicker1 = false"/>
            </van-popup>

            <van-field required label="总需人数" v-model.number="model.flowData.total_num" placeholder="所需人数" type="text"/>
            <!-- <van-field required label="贫困生数" v-model.number="model.flowData.poorNum" placeholder="贫困生数" type="digit"/> -->
            <!-- <van-field required v-if="staffAuth1 === 1 ?true:false" label="贫困生数" v-model.number="model.flowData.poorNum" placeholder="贫困生数" type="digit"/> -->
            <van-field required v-if="staffAuth1 === 1 ?true:false" label="非贫人数" v-model.number="model.flowData.nonpoorNum" placeholder="非贫困生人数" type="digit"/>
            <!-- <van-field required v-if="staffAuth2 === 1 ?true:false" label="校岗人数" v-model.number="model.flowData.otherDeptNum" placeholder="校岗非本院人数" type="digit"/> -->
            <van-field required v-if="staffAuth2 === 1 && deptType === 1" label="校岗人数" v-model.number="model.flowData.otherDeptNum" placeholder="校岗非本院人数" type="digit"/>
            <van-field required label="开始日期" readonly clickable name="calendar" :value="model.flowData.workStartTime"  placeholder="点击选择开始日期" @click="showCalendar1 = true"/>
            <van-calendar :min-date="minDate" :max-date="maxDate" color="rgb(81, 125, 252)" v-model="showCalendar1" @confirm="onConfirmStart" :show-confirm="false"/>
            <van-field required label="工作内容" v-model="model.flowData.stationContent" rows="1" autosize clearable type="textarea" placeholder="工作内容"/>
            <van-field required label="工作地点" v-model="model.flowData.stationLocation" rows="1" autosize clearable type="textarea" placeholder="工作地点"/>
            <van-field label="申请说明" v-model="model.flowData.remarks"  rows="1" autosize clearable type="textarea" placeholder="申请说明"/>
            <!-- <van-field label="备注说明" v-model="model.remarkContent" rows="1" autosize clearable type="textarea" placeholder="其他说明"/> -->
            <van-button round block type="info" native-type="submit">
                {{$route.path ==='/publishment' ? '确认提交' : '确认修改'}}
            </van-button>
        </van-form>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
export default {
    props: ['title','flowID','flowName'],
    data() {
        return {
            studentType:0,
            detail: {},
            value1:'',
            value2:'',
            value3:'',
            model: {
                // flowId:'',  第一次发起申请的时候没有 不用填写这个
                flowName:'',
                procType:"4", // 4-用工申请 或者 5-工时申请
                flowData:{
                    termId:'2',
                    stationType:'', //岗位类别，1-一般岗，4-助教岗，5-助管岗，如不选，默认为一般岗
                    totalNum:'',  // 总人数上限
                    nonpoorNum:'',
                    otherDeptNum:'',
                    remarks:'', // 申请说明信息
                    stationName:'',
                    // stationType:'', //工种 老师用工申请时必填
                    // 注意这个是 写死了
                    deptId:'', //申请老师部门
                    total_num:'', //用工申请人数
                    workStartTime:'',
                    stationContent:'', // 用工内容
                    stationLocation: '' //用工地点
                },
                
            },
            staffAuth1:'',
            staffAuth2:'',
            terms: [],
            term: '',
            termOptions: [],
            //本科生 选择 的 岗位类型
            stationTypes1:[
                {text:'固定岗',value:"1"},
                {text:'临时岗',value:"2"},
                {text:'假期岗',value:"3"},
                {text:'本科生助教',value:"4"},
                ],
            //研究生 选择 的 岗位类型
            stationTypes2:[
                {text:'固定岗',value:"1"},
                {text:'临时岗',value:"2"},
                {text:'假期岗',value:"3"},
                ],
            //研究生 可 选择的 岗位名称   研究生助教 研究生助管 研究生助研  研究生管理员
            stationNames:[
                {text:'研究生助教',value:"1"},
                {text:'研究生助管',value:"2"},
                {text:'研究生助研',value:"3"},
                {text:'研究生管理员',value:"4"},
            ],
            deptType:'',
            stationType: '',
            jobCategory: ['固定岗','临时岗','假期岗','助教岗','研究生助教'],
            showCalendar1: false,
            showCalendar2: false,
            showPicker: false,
            showPicker1: false,
            showPicker2: false,
            showPickerStationName:false,
            showPickerStationType1:false,
            showPickerStationType2:false,
            minDate: new Date(2020, 0, 1), // 测试日期 后端设置的测试日期范围 不在这个范围提交便会报错！
            maxDate: new Date(2021, 11, 31), // 测试日期 后端设置的测试日期范围 不在这个范围提交便会报错！
        }
    },
    components: {
        TopNav
    },
    methods: {
        getstaffAuths(){
            // this.staffAuth1 = sessionStorage.getItem('staffAuth1')-0;
            this.staffAuth1 = sessionStorage.getItem('staffAuth1').slice(1,2)-0;
            // this.staffAuth2 = sessionStorage.getItem('staffAuth2')-0;
            this.staffAuth2 = sessionStorage.getItem('staffAuth2').slice(1,2)-0;

            this.deptType = sessionStorage.getItem('deptType').slice(1,2)-0;

            // 0-部门，1-学院
            console.log(this.deptType)
            this.model.flowData.deptId = sessionStorage.getItem('deptId')-0;
            console.log("deptId:"+this.model.flowData.deptId)

        },
        onConfirmStart(date) {
            this.model.flowData.workStartTime = this.formatMyDate(date)
            this.showCalendar1 = false;
        },
        onConfirmEnd(date) {
            this.model.workEndTime = this.formatMyDate(date)
            this.showCalendar2 = false;
        },
        onConfirmJob(value,index) {
            this.stationType = value
            this.model.stationType = `${index + 1}`
            this.showPicker = false
        },
        onConfirmTerm(value) {
            this.value1 = value.text
            this.model.flowData.termId = value.value
            this.showPicker1 = false
        },
        onConfirmStationType(value) {
            this.value2= value.text;
            this.model.flowData.stationType = value.value
            // console.log("index:"+ value.text);
            // console.log("index:"+ value.value);
            this.showPickerStationType1 = false
            this.showPickerStationType2 = false
        },
        onConfirmStationName(value) {
            this.value3= value.text ;
            this.model.flowData.stationType = value.text ;
            // console.log("index:"+ value.text);
            // console.log("index:"+ value.value);
            this.showPickerStationName = false
        },
        async onSubmit() {
            var isEmplty = false
            for(let key in this.model) {
                if(key !== 'poorNum' && key!=='nonpoorNum' && key!=='otherDeptNum' && key!=='skillQeruire' && key!=='remarkContent') {
                    if(!this.model[key]) {
                        this.$toast.fail('必填项不能为空!!!')
                        isEmplty = true
                        break
                    }
                }
            }
            if(!isEmplty) {
                var res

                // 0-部门，1-学院
                if(this.deptType === 0){
                    this.model.flowData.otherDeptNum = this.model.flowData.total_num
                }
                //请求接口失败 之后再次提交 会有很多个 的用工申请 加到尾部 所以判断尾部如果是 的用工申请的 话就不再加了
                var tempFlowName = this.model.flowName.slice(this.model.flowName.length-5,this.model.flowName.length)
                console.log(tempFlowName);
                if (tempFlowName !== "的用工申请") {
                     this.model.flowName = this.model.flowName + "的用工申请";
                }
                 if(this.model.flowData.stationType == 4 )
                    this.model.flowData.stationName = this.model.flowData.stationName + "本科生助教";

                if(this.$route.path ==='/edit'){
                    this.model.flowId = this.flowID;
                    
                     res = await this.$ajax.post('/system/flows/startFlow', this.model)
                }else{
                     res = await this.$ajax.post('/system/flows/startFlow', this.model)
                }
                // console.log(this.model.procType);


                // if(this.model.procType == "4"){
                //     console.log(123);
                //     this.model.flowData.stationName = this.model.flowData.stationName.slice(0,(this.model.flowData.stationName.length-5));
                //     this.model.flowName = this.model.flowName.slice(0,(this.model.flowName.length-5));
                //     console.log(this.model.flowData.stationName)
                //     // console.log(this.model.flowName)
                // }

                if(res.data.code === 200) {
                    this.$toast.success(res.data.msg)
                    this.$router.push('/publish')
                }else {
                    //修改了 失败时的提示信息 
                    this.$toast.fail(res.data.msg)
                }
                
            }
        },
        formatMyDate(date) {
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            month = month < 10 ? ('0' + month) : month
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            return `${year}-${month}-${d}`
        },
        getTermOptions() {
            const year = new Date().getFullYear()
            if(new Date().getMonth() + 1< 9) {
                const term = `${year -1}-${year}`
                return [`${term}第一学期`, `${term}第二学期`]
            } else {
                const term = `${year}-${year + 1}`
                return [`${term}第一学期`, `${term}第二学期`]
            }
        },

        //任务详情
        async getFlowDetail(flowId){
            const res = await this.$ajax.get('/system/flows/queryFlowData',{params:{flowId : flowId}})
                if(res.data.code === 200){
                    this.model.procType = "4";
                    this.model.flowData.termId = res.data.data.flowData.termId
                    this.model.flowData.stationType = res.data.data.flowData.stationType 
                    this.model.flowData.total_num = res.data.data.flowData.totalNum
                    this.model.flowData.nonpoorNum = res.data.data.flowData.nonpoorNum 
                    this.model.flowData.otherDeptNum = res.data.data.flowData.otherDeptNum
                    this.model.flowData.remarks = res.data.data.flowData.remarks
                    this.model.flowData.deptId = res.data.data.flowData.deptId
                    this.model.flowData.workStartTime = res.data.data.flowData.workStartTime.slice(0,10);
                    this.model.flowData.stationContent = res.data.data.flowData.stationContent
                    this.model.flowData.stationLocation = res.data.data.flowData.stationLocation 
                    console.log(res.data.data);
                }else{
                    console.log(res.data.msg);
                }
        },
        async getTermList(){
            const res = await this.$ajax.get('/system/term/list')
            if(res.data.code === 200){
                console.log(res.data.rows)
                res.data.rows.forEach(item => {
                    var term ={
                       text:'',
                       value:'' 
                    }
                    term.text = item.termName;
                    term.value = item.termId;
                    console.log(term);
                    this.terms.push(term);
                });
            }
        },
    },
   
    mounted() {
        this.getTermList();
        this.getstaffAuths();
        if(this.$route.path === '/edit'){
                this.getFlowDetail(this.flowID);
                this.model.flowName = this.flowName.slice(0,this.flowName.length-5);
            }
    }
    
}
</script>

<style scoped>
.van-button {
    width: 95%;
    margin: 15px auto;
}
</style>