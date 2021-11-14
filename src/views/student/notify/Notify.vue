<template>
    <div class="notify">
        <top-nav title="公告通知" :isShow="false"/>
        <employment />
        <bottom-nav :active="1"/>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import Employment from './Employment.vue'
import BottomNav from '@/components/common/BottomNav.vue'
export default {
    provide: {
        // option用于向孙子组件dropdown-menu传递数据
        option: [{
            text: '全部',
            value: 0
        }, {
            text: '未读',
            value: 1
        }, {
            text: '已读',
            value: 2
        }]
    },
    components: {
        TopNav,
        Employment,
        BottomNav,
    }
}
</script>