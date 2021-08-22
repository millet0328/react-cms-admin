import React from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";

//导入页面级组件
import Login from './pages/Login';
import Register from "./pages/Register";
import Framework from "./components/Framework";

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
                <Route path="/">
                    <Framework/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
