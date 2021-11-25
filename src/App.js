import React from 'react';
import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
// 404
import NoMatch from "./pages/NoMatch";
// 权限组件
import RequireAuth from "./router/RequireAuth";
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
                    <Route path="/auth/*" element={
                        <RequireAuth>
                            <Auth/>
                        </RequireAuth>
                    }/>
                    <Route path="/category/*" element={
                        <RequireAuth>
                            <Category/>
                        </RequireAuth>
                    }/>
                    <Route path="/article/*" element={
                        <RequireAuth>
                            <Article/>
                        </RequireAuth>
                    }/>
                    <Route path="/user/*" element={
                        <RequireAuth>
                            <User/>
                        </RequireAuth>
                    }/>
                    <Route path="/admin/*" element={
                        <RequireAuth>
                            <Admin/>
                        </RequireAuth>
                    }/>
                </Route>
                <Route path="*" element={ <NoMatch/> }></Route>
            </Routes>
        </HashRouter>
    );
}


export default App;
