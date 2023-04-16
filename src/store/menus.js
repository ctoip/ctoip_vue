import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        //当前活动bar值
        editableTabsValue: 'Index',
        //活动的bar数组
        editableTabs: [{
            title: '首页',
            name: 'Index',
        }],
        hasRoutes: false,
        menuList: [
            {
                name: "VirusAnalysis",
                title: "样本分析",
                icon: "el-icon-plus",
                path: "",
                component: "",
                children: [
                    {
                        name: "FileDetail",
                        title: "样本详情",
                        icon: "el-icon-minus",
                        path: "/filedetail",
                        component: "sys/VirusAnalysis/FileDetail",
                        children: [],
                    },
                    {
                        name: "WebSendBox",
                        title: "云沙箱分析",
                        icon: "el-icon-minus",
                        path: "/sys/websendbox",
                        component: "sys/VirusAnalysis/WebSendBox",
                        children: [],
                    },
                    {
                        name: "LocalSendBox",
                        title: "本地沙箱分析",
                        icon: "el-icon-minus",
                        path: "/sys/localsendbox",
                        component: "sys/VirusAnalysis/LocalSendBox",
                        children: [],
                    },
                ],
            },
            {
                name: "IpTrace",
                title: "IP溯源",
                icon: "el-icon-plus",
                component: "",
                path: "",
                children: [
                    {
                        name: "IpWhois",
                        title: "IP查询",
                        icon: "el-icon-minus",
                        path: "/sys/ipwhois",
                        component: "sys/IpTrace/IpWhois",
                        children: [],
                    },
                    {
                        name: "DomainQuery",
                        title: "域名查询",
                        icon: "el-icon-minus",
                        path: "/sys/domainquery",
                        component: "sys/IpTrace/DomainQuery",
                        children: [],
                    },
                    {
                        name: "AssetQuery",
                        title: "资产查询",
                        icon: "el-icon-minus",
                        path: "/sys/assetquery",
                        component: "sys/IpTrace/AssetQuery",
                        children: [],
                    },
                ],
            },
            {
                name: "TraceabilityReport",
                title: "攻击者溯源",
                icon: "el-icon-plus",
                path: "/traceabilityreport",
                component: "",
                children: [
                    {
                        name: "AttackerPortrait",
                        title: "攻击者画像",
                        icon: "el-icon-minus",
                        path: "/sys/attackerportrait",
                        component: "sys/TraceabilityReport/AttackerPortrait",
                        children: [],
                    },
                ],
            },

            {
                name: "Tools",
                title: "小工具",
                icon: "el-icon-plus",
                path: "",
                component: "",
                children: [
                    {
                        name: "EnCodeTools",
                        title: "转码工具",
                        icon: "el-icon-minus",
                        path: "/sys/encodetools",
                        component: "sys/Tools/EnCodeTools",
                        children: [],
                    },
                    {
                        name: "NetTools",
                        title: "网络工具箱",
                        icon: "el-icon-minus",
                        path: "/sys/nettools",
                        component: "sys/Tools/NetTools",
                        children: [],
                    },
                ],
            },
        ],
    },
    getters: {

    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus
        },
        changeRouteStatus(state, hasRoutes) {
            state.hasRoutes = hasRoutes
        },
        addTab(state, tab) {
            let index = state.editableTabs.findIndex(e => e.name === tab.name)
            //查看该选项是否存在，如果不存在则创建bar
            if (index === -1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name,
                });
            }
            state.editableTabsValue = tab.name;
        },
        resetState: (state) => {
            //state.menuList = []
            state.hasRoutes = false
            state.editableTabsValue = 'Index'
            state.editableTabs = [{
                title: '首页',
                name: 'Index',
            }]
        }
    },
    actions: {

    }
}