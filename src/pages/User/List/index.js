import React, { useState, useEffect } from "react";
import { Card, Table, Button, Space, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../../../api';
import { Link } from 'react-router-dom';

function List() {
    let [dataSource, setDataSource] = useState([]);

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
                    <Link to={ `/user/edit/${ record.id }` }>
                        <Button type="primary" icon={ <EditOutlined/> } ghost>编辑</Button>
                    </Link>
                    <Popconfirm title="确定要删除此用户吗?" onConfirm={ (e) => handleRemove(index, record.id, e) }>
                        <Button icon={ <DeleteOutlined/> } danger>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    async function handleRemove(i, id) {
        let { status, msg } = await User.remove({ id });
        if (status) {
            message.success(msg);
            // 操作DOM
            dataSource.splice(i, 1);
            setDataSource([...dataSource]);
        } else {
            message.error(msg);
        }
    }

    // componentDidMount会执行
    useEffect(() => {
        //加载表格数据
        async function loadList() {
            let { status, data } = await User.list();
            if (status) {
                setDataSource(data);
            }
        }

        loadList();
    }, []);


    return (
        <Card title="用户列表">
            <Table dataSource={ dataSource } columns={ columns } rowKey="id"></Table>
        </Card>
    )
}

export default List;