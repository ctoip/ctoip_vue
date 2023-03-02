import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        editableTabsValue: 'Index',
        editableTabs: [{
            title: '首页',
            name: 'Index',
        }],
        hasRoutes: false,
        menuList: [
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
                name: "VirusAnalysis",
                title: "样本分析",
                icon: "el-icon-plus",
                path: "",
                component: "",
                children: [
                    {
                        name: "WebSendBox",
                        title: "沙盒分析",
                        icon: "el-icon-minus",
                        path: "/sys/websendbox",
                        component: "sys/VirusAnalysis/WebSendBox",
                        children: [],
                    },
                    {
                        name: "StaticDataAnalysis",
                        title: "静态分析",
                        icon: "el-icon-minus",
                        path: "/sys/staticdataanalysis",
                        component: "sys/VirusAnalysis/StaticDataAnalysis",
                        children: [],
                    },
                    {
                        name: "FileDetail",
                        title: "样本详情",
                        icon: "el-icon-minus",
                        path: "/filedetail",
                        component: "sys/VirusAnalysis/FileDetail",
                        children: [],
                    },
                ],
            },

            {
                name: "TraceabilityReport",
                title: "溯源报告",
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
                    {
                        name: "IpDiagram",
                        title: "IP拓扑图",
                        icon: "el-icon-minus",
                        path: "/sys/ipdiagram",
                        component: "sys/TraceabilityReport/IpDiagram",
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
                        name: "BaseCode",
                        title: "Base转码",
                        icon: "el-icon-minus",
                        path: "/sys/basecode",
                        component: "sys/Tools/BaseCode",
                        children: [],
                    },
                    {
                        name: "HashCode",
                        title: "哈希转码",
                        icon: "el-icon-minus",
                        path: "/sys/hashcode",
                        component: "sys/Tools/HashCode",
                        children: [],
                    },
                    {
                        name: "UrlCode",
                        title: "Url转码",
                        icon: "el-icon-minus",
                        path: "/sys/urlcode",
                        component: "sys/Tools/UrlCode",
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