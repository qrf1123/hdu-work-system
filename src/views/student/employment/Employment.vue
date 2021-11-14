<template>
    <div class="profile">
        <top-nav title="招聘" :isShow="false" />
        <tabs>
            <job />
            <record />
        </tabs>
        <bottom-nav :active="0"/>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import Tabs from '@/components/common/Tabs.vue'
import Job from './Job'
import Record from './Record'
export default {
    components: {
        TopNav,
        BottomNav,
        Tabs,
        Job,
        Record
    },
    provide: {
        // option用于向孙子组件dropdown-menu传递数据
        option: [{
            text: '按发布日期降序',
            value: 0
        }, {
            text: '按用工人数降序',
            value: 1
        }]
    }
}
</script>