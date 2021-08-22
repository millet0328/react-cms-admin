import React, { useState, useEffect } from "react";
import { Card, Table, Button, Space, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function List() {
    let columns = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: '角色',
            dataIndex: 'name',
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
        <Card title="角色列表">
            <Table columns={ columns }></Table>
        </Card>
    )
}

export default List;