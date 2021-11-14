<template>
    <div class="profile">
        <top-nav title="个人考勤" :isShow="false" />
        <clock :stationId ="stationId"/>
        <tabs>
            <sign />
            <!-- <record /> -->
        </tabs>
        <bottom-nav :active="2"/>
    </div>
</template>

<script>
import TopNav from '@/components/common/TopNav.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import Tabs from '@/components/common/Tabs.vue'
import Clock from '@/components/common/Clock.vue'
import Sign from './Sign.vue'
// import Record from './Record.vue'
export default {
    components: {
        TopNav,
        BottomNav,
        Tabs,
        Sign,
        // Record,
        Clock
    },
    data(){
        return{
            stationId : 2
        }
    }
}
</script>

<style scoped>
</style>