import axios from "axios";
import router from "./router";
import Element from "element-ui"
import store from './store';
import cookies from "axios/lib/helpers/cookies.js";
import CryptoJS from 'crypto-js';

//axios.defaults.baseURL = "http://localhost:8081"

const request = axios.create({
    timeout: 1000 * 60,
    baseURL: "/api",
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})

//资源的请求携带jwt的token
request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token")
    var cookie = cookies.read("setCookieName")
    var array = []
    array.push(cookie.charAt(3))
    array.push(cookie.charAt(16))
    array.push(cookie.charAt(29))
    array.push(cookie.charAt(10))
    var str = array.join('')
    config.headers['setHeaderName'] = cookie + "-" + CryptoJS.MD5(str).toString()
    return config
}, error => {
    return Promise.reject(error);
});

//响应拦截处理Http状态码,弹窗
request.interceptors.response.use(
    response => {
        //console.log("response ->" + response)
        let res = response.data

        if (res.code === 200) {
            return response
        }
        else {
            console.log(res.code)
            Element.Message.error(!res.msg ? '系统异常' : res.msg)
            return Promise.reject(response.data.msg)
        }
    },
    error => {
        if (error.response.data) {
            error.massage = error.response.data.msg
        }
        if (error.response.status === 401) {
            error.massage = "无权操作:401"
            //权限不足
            router.push("/login")
        }
        if (error.response.status === 404) {
            error.massage = "无法访问资源:404"
        }
        if (error.response.status === 500 || error.response.status === 502 || error.response.status === 503) {
            error.massage = "后端错误，请检查输入" + error.response.status + ", " + error.response.massage
        }
        else {
            error.massage = "未知错误：" + error.response.status + " " + error.response.code
        }
        Element.Message.error(error.massage, { duration: 3000 })
        return Promise.reject(error)
    }
)

export default request