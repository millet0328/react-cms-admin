import React, { useState, useEffect } from "react";
import { Card, Table, Button, Space, message, Popconfirm, Modal, Form, Input, } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Role } from '../../../api';

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
                    <Button onClick={ (e) => handleOpenModal(index, record, e) } type="primary" icon={ <EditOutlined/> }
                            ghost>编辑</Button>
                    <Popconfirm title="确定要删除此角色吗?" onConfirm={ (e) => handleRemove(index, record.id, e) }>
                        <Button icon={ <DeleteOutlined/> } danger>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    let [dataSource, setDataSource] = useState([]);
    //加载表格数据
    useEffect(() => {
        async function loadList() {
            let { status, data } = await Role.list();
            if (status) {
                setDataSource(data);
            }
        }

        loadList();
    }, []);

    // 删除角色
    const handleRemove = async (i, id) => {
        let { status, msg } = await Role.remove(id);
        if (status) {
            message.success(msg);
            // 操作DOM
            dataSource.splice(i, 1);
            setDataSource([...dataSource]);
        } else {
            message.error(msg);
        }
    }
    // 模态框
    const [editVisible, setEditVisible] = useState(false);
    const [currentData, setCurrentData] = useState({});
    //获取Form实例
    let [form] = Form.useForm();
    // 打开模态框
    const handleOpenModal = (i, data, e) => {
        // 缓存数据
        setCurrentData({ i, ...data });
        // 还原表单
        form.setFieldsValue({ ...data });
        // 显示模态框
        setEditVisible(true);
    };

    const handleEdit = async (values) => {
        let { i, id } = currentData;
        // 表单校验通过
        let { status, msg } = await Role.edit(id, values)
        if (status) {
            message.success(msg);
            // 操作DOM
            dataSource[i] = { ...currentData, ...values };
            setDataSource([...dataSource]);
            // 关闭Modal
            setEditVisible(false);
        } else {
            message.error(msg);
        }

    };

    return (
        <Card title="角色列表">
            <Table dataSource={ dataSource } columns={ columns } rowKey="id"></Table>
            <Modal title="编辑角色" visible={ editVisible } onOk={ () => form.submit() }
                   onCancel={ (e) => setEditVisible(false) }>
                <Form onFinish={ handleEdit } form={ form } labelCol={ { span: 5 } } wrapperCol={ { span: 19 } }>
                    <Form.Item label="角色名称" name="name"
                               rules={ [
                                   { required: true, message: '请输入角色名称！' },
                                   { type: 'string', min: 2, message: '请输入至少2个字符！' }
                               ] }>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}

export default List;