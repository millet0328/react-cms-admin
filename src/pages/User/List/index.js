import React, { useState, useEffect } from "react";
import { Card, Table, Button, Space, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function List() {
    let columns = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
        },
        {
            title: '性别',
            dataIndex: 'sex',
        },
        {
            title: '手机',
            dataIndex: 'tel',
        },
        {
            title: '操作',
            render: (text, record, index) => (
                <Space>
                    <Button type="primary" icon={ <EditOutlined/> } ghost>编辑</Button>
                    <Button type="primary" icon={ <DeleteOutlined/> } ghost danger>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <Card title="用户列表">
            <Table columns={ columns }></Table>
        </Card>
    )
}

export default List;