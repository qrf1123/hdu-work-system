<template>
  <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>

    <!-- <router-view/> -->
  </div>
</template>
<script >
import Vue from 'vue'
export default Vue.extend({
    watch:{
      // $route(to,from){
      //   // var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      //   // this.scrollMap[from.path] = scrollTop;
      //   // localStorage.setItem("scroMap",JSON.stringify(this.scrollMap));
      // }
    },
    // updated(){
    //   var hash = window.location.hash.slice(1);
    //   var scrollMap = JSON.parse(localStorage.getItem('scroMap'));
    //   if(scrollMap[hash] && this.$route.meta.keepAlive){
    //     document.documentElement.scrollTop = scrollMap[hash];
    //     window.pageYOffset = scrollMap[hash];
    //     document.body.scrollTop = scrollMap[hash];
    //   }
    // }
})
</script>

<style>
  * {
        margin: 0;
        padding: 0;
    }
    body {
        background-color: rgb(247, 248, 250);
    }
    #app {
        font-family: "微软雅黑",Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
