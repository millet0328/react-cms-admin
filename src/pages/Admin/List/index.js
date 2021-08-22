import { useState, useEffect } from 'react';

import { Card, Table, Image, Button, Space, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Admin } from '../../../api/index';
import { Link } from 'react-router-dom';

function List() {

    let [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        // 加载数据
        async function fetchData() {
            let { status, data } = await Admin.list();
            if (status) {
                setDataSource(data);
            }
        }

        fetchData();
    }, []);

    //删除数据
    async function handleRemove(i, id) {
        let { status, msg } = await Admin.remove({ id });
        if (status) {
            message.success(msg);
            // 更新state
            dataSource.splice(i, 1);
            setDataSource([...dataSource]);
        }

    }

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '姓名',
            dataIndex: 'fullname',
            key: 'fullname',
        },

        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: '手机',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (photo) => (<Image width={ 60 } src={ photo }/>)
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <Space>
                    <Link to={ `/admin/edit/${ record.id }` }>
                        <Button type="primary" icon={ <EditOutlined/> } size="middle" ghost>编辑</Button>
                    </Link>
                    <Popconfirm title="确定要删除此账户吗?" onConfirm={ (e) => handleRemove(index, record.id, e) }>
                        <Button icon={ <DeleteOutlined/> } danger size="middle">删除</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];
    return (
        <Card title="管理员列表">
            <Table rowKey='id' dataSource={ dataSource } columns={ columns } size="middle"/>;
        </Card>
    )
}

export default List;
