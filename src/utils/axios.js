import axios from 'axios'

import router from '../routes'

const baseURL = 'http://www.zjcylog.com:10002';

axios.interceptors.request.use(config => {
    config.header = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, X-Requested-By, If-Modified-Since, X-File-Name, X-File-Type, Cache-Control, Origin',
        'access-control-expose-headers': 'Authorization'
    }
    const current_href = window.location.href;
    if (current_href.indexOf('login') > -1) {
        // console.log('登录页面')
    } else {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

    }
    
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {

    // 检测某种状态进行重定向 !!!!!
    // if (response.status === 302) {
    //   Router.push({
    //     name: 'home'
    //   })
    // }
    return response
}, error => {
    return Promise.resolve(error.response)
})

const checkStatus = response => {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        // 如果不需要除了data之外的数据，可以直接 return response.data

        return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}

function checkCode(res) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        // console.log('请求异常, 重新登陆');
        
        alert('请求异常, 重新登陆');
        router.replace({
            path: '/login'
        })
    }
    if (res.data && (!res.data.success)) {
        // console.log(res)
        // console.log(res.data.msg)
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            baseURL,
            url,
            data,
            timeout: 10000
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    get(url, params, responseType) {
        return axios({
            method: 'get',
            baseURL,
            url,
            params,
            responseType: responseType ? responseType : '',
            timeout: 10000
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    put(url, data) {
        return axios({
            method: 'put',
            baseURL,
            url,
            data,
            timeout: 10000
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}