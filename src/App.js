import React from 'react';
import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
// 权限组件
//导入公共框架
import Framework from "./components/Framework";
//导入页面级组件
import Login from './pages/Login';
import Register from "./pages/Register";
// 导入模块组件
import Auth from "./pages/Auth/";
import Category from "./pages/Category/";
import Article from "./pages/Article/";
import User from "./pages/User/";
import Admin from './pages/Admin/';

// 导航守卫
function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={ <Login/> }/>
                <Route path="/register" element={ <Register/> }/>
                <Route path="/login" element={ <Login/> }/>
                <Route element={ <Framework/> }>
                    <Route path="/auth/*" element={ <Auth/> }/>
                    <Route path="/category/*" element={ <Category/> }/>
                    <Route path="/article/*" element={ <Article/> }/>
                    <Route path="/user/*" element={ <User/> }/>
                    <Route path="/admin/*" element={ <Admin/> }/>
                </Route>
            </Routes>
        </HashRouter>
    );
}


export default App;
