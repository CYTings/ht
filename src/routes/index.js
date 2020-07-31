import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login'
import modifyPassword from '@/views/modifyPassword/modifyPassword'
import RouteView from '@/layouts/RouteView'
import MenuView from '@/layouts/MenuView'

import Print from 'vue-print-nb' // 打印模块

Vue.use(Print);

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            name: '登录页',
            component: Login,
            invisible: true
        },
        {
            path: '/modify',
            name: '修改密码',
            component: modifyPassword,
            invisible: true
        },
        {
            path: '/',
            name: '首页',
            component: MenuView,
            redirect: '/login',
            icon: 'none',
            invisible: true,
            children: [{
                    path: '/list',
                    name: '运单',
                    component: RouteView,
                    icon: 'none',
                    children: [{
                        path: '/list/productlist',
                        name: '运单列表',
                        component: () =>
                            import ('@/views/List/ProductList'),
                        icon: 'none'
                    }]
                },
                {
                    path: '/customer',
                    name: '客户',
                    component: RouteView,
                    icon: 'none',
                    children: [{
                        path: '/customer/customerlist',
                        name: '客户列表',
                        component: () =>
                            import ('@/views/customer/Customerlist'),
                        icon: 'none'
                    }]
                }
            ]
        }
    ]
})