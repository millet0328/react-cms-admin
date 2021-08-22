import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
//公共类
import './index.css';
//axios
import './plugins/axios';
//antd
import { ConfigProvider } from 'antd';
import config from './plugins/antd';
// react-redux绑定库
import { Provider } from 'react-redux';
import store from "./store";

ReactDOM.render(
    <ConfigProvider locale={ config.zhCN }>
        <Provider store={ store }>
            <App/>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
