<template>
    <van-popup position="right" :style="{ height: '100%',width: '70%', paddingTop: '30px' }" v-model="show">
            <van-collapse v-model="activeNames">
                <van-collapse-item title="部门" name="department">
                    <div>
                        <van-dropdown-menu >
                            <van-dropdown-item v-model="dept" :options="depts" @change="handleDept(dept)"/>
                        </van-dropdown-menu>
                    </div>
                </van-collapse-item>
            </van-collapse>
        <van-cell>
            <h4>工种</h4>
            <div class="category">
                <van-button v-for="(item,index) in stationCategory" :key="index" @click="handleCategory(index)"
                size="small" plain color="rgb(81, 125, 252)">{{item}}</van-button>
            </div>
        </van-cell>
        <van-cell>
            <van-button size="small" @click="handleSubmit" color="rgb(81, 125, 252)">提交</van-button>
            <van-button size="small" @click="handleReset" color="rgb(81, 125, 252)">重置</van-button>
        </van-cell>
    </van-popup>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            activeNames: [''],
            stationCategory: ['固定岗','临时岗','假期岗','本科生助教'],
            dept: 1,
            category:1,
            depts: [
                // { text: '杭州电子科技大学', value: 1 },
            ],
        }
    },
    methods: {
        async getDeptList(){
            const res = await this.$ajax.get('/system/api/student/getDepts')
            if(res.data.code === 200){
                console.log(res.data.data)
                res.data.data.forEach(item => {
                    var tempDept ={
                        text:'',
                        value:''
                    }
                    tempDept.text = item.deptName;
                    tempDept.value = item.deptId;
                    this.depts.push(tempDept);
                });
            }
        },
        handleReset() {
            this.$emit('reset')
            this.show = false
        },

        handleSubmit(){
            const vim = this;
            this.$emit('handleSubmit',vim.category+1,vim.dept);

        },

        handleCategory(category) {
            console.log(category);
            this.category = category;
            console.log(this.category);
            // this.$emit('changeCategory', category + 1)
        },

        handleDept(dept) {
            console.log(dept);
            this.dept = dept;
            console.log(this.dept);
            // this.$emit('changeDept',dept)
        }
    },
    mounted(){
        this.getDeptList()
    }

}
</script>

<style scoped>
    .van-button {
        margin: 5px 1px ;
    }
</style>