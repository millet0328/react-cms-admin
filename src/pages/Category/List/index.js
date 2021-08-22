import React, { useState, useEffect } from "react";
import { Card, Tree } from "antd";
import './index.css';

function List() {
    return (
        <Card title="分类列表">
            <Tree/>
        </Card>
    )
}

export default List;