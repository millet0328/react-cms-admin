import React, { useState, useEffect } from "react";
import { Card, Table, Button, Space, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../../../api';
import { Link } from 'react-router-dom';

function List() {
    let [tableData, setTableData] = useState([]);

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
                    <Button onClick={ (e) => handleOpenConfirm(index, record.id, e) } type="primary"
                            icon={ <DeleteOutlined/> }
                            ghost
                            danger>删除</Button>
                </Space>
            ),
        },
    ];

    // 删除
    let [visible, setVisible] = useState(false);
    let [current, setCurrent] = useState(-1);
    let [id, setId] = useState();

    function handleOpenConfirm(i, id) {
        //记录索引、uid
        setCurrent(i);
        setId(id);
        //显示confirm
        setVisible(true);
    }

    async function handleRemove() {
        let { status, msg } = await User.remove({ id });
        if (status) {
            message.success(msg);
            // 操作DOM
            tableData.splice(current, 1);
            setTableData([...tableData]);
            // 关闭confirm
            setVisible(false);
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
                setTableData(data);
            }
        }

        loadList();
    }, []);


    return (
        <Card title="用户列表">
            <Table dataSource={ tableData } columns={ columns } rowKey="id"></Table>
            <Modal
                title="确认删除"
                visible={ visible }
                onCancel={ () => setVisible(false) }
                onOk={ handleRemove }
            >
                <p>确定要删除此数据吗？</p>
            </Modal>
        </Card>
    )
}

export default List;