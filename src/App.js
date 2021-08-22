import React from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";

//导入页面级组件
import Login from './pages/Login';
import Register from "./pages/Register";
// Layout
import Framework from "./components/Framework";
// 导航守卫
import PrivateRoute from "./router/PrivateRoute";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <PrivateRoute path="/">
                    <Framework/>
                </PrivateRoute>
            </Switch>
        </Router>
    );
}


export default App;
