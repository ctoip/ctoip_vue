# CLAUDE.md

## 项目定位
- 子项目：`ctoip_vue`
- 类型：Vue2 + Vuex + Vue Router + Element UI 前端
- 作用：CTOIP 系统 UI 与交互层

## 关键入口
- 应用入口：`src/main.js`
- 路由：`src/router/index.js`
- 请求封装：`src/axios.js`
- 菜单与动态路由来源：`src/store/menus.js`

## 与后端对接
- axios `baseURL`：`/api`
- 开发代理：`vue.config.js` 中 `/api -> http://localhost:8081/`
- 登录后从响应头读取 `authorization` 并写入本地存储

## 本地开发命令
```bash
npm install
npm run serve
```

## 构建命令
```bash
npm run build
```

## 与其它子项目关系
- 后端接口来自 `ctoip`
- 生产部署由 `ctoip_docker` 的 `web` 服务（nginx）承载 dist 产物

## 当前已确认约定
- 登录页默认走 `/captcha` + `/login`
- 业务页面通过菜单配置动态挂载路由
- 前端大量使用 Element UI 组件体系
