import Vue from 'vue'
import Vuex from 'vuex'
import menus from "./menus";

Vue.use(Vuex)

//vue中的store就是全局存储
export default new Vuex.Store({
  //定义全局参数
  state: {
    username: '',
    token: '',
  },
  //get方法,并且每次打开浏览器优先执行该方法，获取所有的状态
  getters: {
  },
  //set方法
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
      sessionStorage.setItem("token", token)
    },
    SET_USERNAME: (state, username) => {
      state.username = username
      localStorage.setItem("username", username)
      sessionStorage.setItem("username", username)
    }
  },
  // 处理state的方法体
  actions: {

  },

  //给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
  modules: {
    menus
  }
})
