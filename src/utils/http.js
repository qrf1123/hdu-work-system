import Vue from 'vue'
import Axios from "axios";
import router from '../router'
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const http = Axios.create({
    baseURL: "/api", // http://94.191.90.221:8100/mock/46/api
    // baseURL: "/",
    timeout: 10000
});

// request拦截器
http.interceptors.request.use(config => {
    // 加载进度条
    NProgress.start();
    const token = sessionStorage.getItem('token') || ''
    const url = config.url
    if (token && url !== '/common/apiLogin') { //如果是登陆页面不需要带上token
        config.headers.Authorization = token //请求头加上token
    }
    return config;
}, err => {
    return Promise.reject(err);
});

// response拦截器
http.interceptors.response.use(response => {
    // 结束加载进度条
    NProgress.done();
    if (response.data.code === 401) {
        sessionStorage.removeItem('token')
        Vue.prototype.$toast('身份过期，请重新登录=_=')
        router.replace('/login')
    }
    return response;
}, err => {
    NProgress.done();
    return Promise.reject(err);
});

export default http;