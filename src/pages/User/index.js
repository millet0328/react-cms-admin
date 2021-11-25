import React from "react";
import { Route, Routes } from "react-router-dom";

//导入页面级组件
import List from "./List";
import Edit from "./Edit";

function Article() {
    return (
        <Routes>
            <Route path='edit/:id' element={ <Edit/> }/>
            <Route path='list' element={ <List/> }/>
        </Routes>
    )
}

export default Article;