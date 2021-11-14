<template>
    <div class="message">
        <top-nav title="消息管理" :isShow="false" />
        <tabs>
            <notify />
            <deal />
        </tabs>
        <bottom-nav :active="0"/>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import BottomNav from '@/components/teacher/BottomNav.vue'
import Tabs from '@/components/common/Tabs.vue'
import Notify from './Notify'
import Deal from './Deal'
export default {
    components: {
        TopNav,
        BottomNav,
        Tabs,
        Deal,
        Notify
    }
}
</script>