import axios from "axios";
import router from "./router";
import Element from "element-ui"

//axios.defaults.baseURL = "http://localhost:8081"

const request = axios.create({
    // timeout: 5000,
    baseURL: "/api",
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})

//登录完成后的请求携带jwt的token
request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token")
    return config
}, error => {
    return Promise.reject(error);
});

//响应拦截处理Http状态码,弹窗
request.interceptors.response.use(
    response => {
        // console.log("response ->" + response)
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
            //权限不足
            router.push("/login")
        }
        if (error.response.status === 500) {
            error.massage = "500 (Internal Server Error)"
            //后端未运行
            router.push("/login")
        }
        else {
            error.massage = "未知错误"
        }
        Element.Message.error(error.massage, { duration: 3000 })
        return Promise.reject(error)
    }
)

export default request