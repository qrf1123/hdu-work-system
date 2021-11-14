<template>
    <div class="edit">
        <my-form title="编辑" :flowID="this.$route.query.flowId" :flowName="this.$route.query.flowName"/>
    </div>
</template>

<script>
import MyForm from './Form.vue'
export default {
    
    components: {
        MyForm
    },
    methods:{

    },
    mounted(){
        console.log(this.$route.query.flowId)
    }
}
</script>