import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '@/views/Home'
import store from '@/store'
import Element from "element-ui"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/Index'),
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  let hasRoute = store.state.menus.hasRoutes
  let token = localStorage.getItem("token")
  let nav = store.state.menus.menuList

  if (to.path == '/login') {
    next()
  } else if (to.path == '/' || to.path == '/home') {
    next({ path: '/index' })
  }
  else if (!token) {
    next({ path: '/login' })
  } else if (!hasRoute) {
    // 动态绑定路由
    let newRoutes = router.options.routes
    nav.forEach(menu => {
      if (menu.children) {
        menu.children.forEach(e => {
          // 转成路由
          let route = menuToRoute(e)
          // 吧路由添加到路由管理中
          if (route) {
            newRoutes[0].children.push(route)
          }
        })
      }
    })
    store.commit("changeRouteStatus", true)
    router.addRoutes(newRoutes)
    Element.Message({
      message: '欢迎回来' + localStorage.getItem('username'),
      type: 'success'
    })
    next({ path: to.path })
  }
  next()
})

// 导航转成路由
const menuToRoute = (menu) => {

  if (!menu.component) {
    return null
  }
  let newroute = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title
    },
  }
  newroute.component = () => import('@/views/' + menu.component + '.vue')
  return newroute
}

export default router
