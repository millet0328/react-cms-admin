import React from "react";
import { Route, Routes } from "react-router-dom";

//导入页面级组件
import List from "./List";

function Auth() {
    return (
        <Routes>
            <Route path='list' element={ <List/> }/>
        </Routes>
    )
}

export default Auth;