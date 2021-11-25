import axios from "axios";
import { notification } from 'antd';
import { createHashHistory } from "history";

//设置baseUrl
axios.defaults.baseURL = 'http://localhost:3001';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 提取token
    let token = sessionStorage.token;
    // 添加至headers
    config.headers.Authorization = `Bearer ${ token }`;
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function ({ data, status }) {
    //在这里你可以判断后台返回数据携带的请求码
    if (status === 200) {
        return data
    }
}, function ({ response }) {
    let { status } = response;
    // 处理响应错误
    switch (status) {
        case 401:
            // 生成history对象
            const history = createHashHistory();
            // 错误提示框
            notification.error({
                message: `错误：${ status }`,
                description: 'token过期，请重新登陆账户！',
                onClose: (res) => {
                    // 获取当前地址
                    const current = history.location.pathname;
                    // 此处与权限组件RequireAuth冲突，如果当前地址为/login，则无需跳转。
                    if (current === '/login') {
                        return;
                    }
                    //强制跳转路由
                    document.location.hash = `/login?redirect=${ current }`;
                }
            });

            break;
        case 404:
            //错误提示框
            notification.error({
                message: `错误：${ status }`,
                description: 'api接口地址错误，请重新检查！',
            });
            break;
        case 500:
            //错误提示框
            notification.error({
                message: `错误：${ status }`,
                description: '后台接口错误，请联系后台开发！',
            });
            break;
        default:
            break;
    }
    // 防止后续js报错
    return false;
});