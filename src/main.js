import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Dialog } from 'vant';
import { Notify } from 'vant';
import { Toast } from 'vant';
import Vant from "vant";
import "vant/lib/index.css";
import http from "@/utils/http.js";

Vue.config.productionTip = false;


Vue.use(Vant);
Vue.prototype.$ajax = http;
Vue.prototype.$dialog = Dialog;
Vue.prototype.$notify = Notify;
Vue.prototype.$toast = Toast

// 用户未登录则自动跳转到登录页面
router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token')
    if (token) { //if(token && to.meta.role === role)
        next()
    } else {
        if (to.path === '/login') {
            sessionStorage.removeItem('token')
            next() // 如果不加入这一条件语句，则会陷入死循环
        } else {
            sessionStorage.removeItem('token')
            next('/login');
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");