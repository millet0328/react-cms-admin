import React from "react";
import { Route, Routes } from 'react-router-dom';

//导入页面级组件
import List from "./List";
import Edit from "./Edit";
import Setting from './Setting/';

function Admin() {
    return (
        <Routes>
            <Route path='list' element={ <List/> }/>
            <Route path='edit/:id' element={ <Edit/> }/>
            <Route path='setting' element={ <Setting/> }/>
        </Routes>
    )
}

export default Admin;
