import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, Tree, Space, Form, Input, Button, Modal, message } from "antd";
import { EditOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.css';
import { Category } from '../../../api';

function List() {
    //初始化数据
    let initTreeData = useMemo(() => {
        return [{ title: '全部分类', key: '0', id: 0 }]
    }, []);
    //扁平化结构
    let [originData, setOriginData] = useState([]);
    //树形结构
    let [treeData, setTreeData] = useState(initTreeData);

    let convertTree_memoized = useCallback((list, orginData) => {
        //递归生成树形结构
        function convertTree(list, orginData) {
            return list.map((parent) => {
                let children = orginData.filter((child) => child.parent_id === parent.id);
                if (children.length) {
                    return { ...parent, children: convertTree(children, orginData) };
                } else {
                    return { ...parent }
                }
            });
        }

        return convertTree(list, orginData)
    }, []);
    // 加载子节点数据
    useEffect(() => {
        async function loadData() {
            let { status, data } = await Category.list();
            if (status) {
                // 处理节点数据，添加key，title，children
                let originData = data.map((item) => {
                    return { ...item, key: item.id, title: item.name };
                });
                // 缓存原始数据
                setOriginData(originData);
                // 转换数据为树形结构
                let treeData = convertTree_memoized(initTreeData, originData);
                setTreeData(treeData);
            }
        }

        loadData();
    }, [initTreeData, convertTree_memoized]);

    //渲染节点
    function handleTitleRender(nodeData) {
        return (
            <div className="node">
                <div className="name">{ nodeData.title }</div>
                <div className="actions">
                    <Space>
                        <Button onClick={ (e) => handleOpenEditModal(nodeData, e) }
                                disabled={ nodeData.id === 0 } icon={ <EditOutlined/> } type="link">编辑</Button>
                        <Button onClick={ (e) => handleOpenInsertModal(nodeData, e) }
                                icon={ <PlusCircleOutlined/> } type="link">添加</Button>
                        <Button onClick={ (e) => handleOpenRemoveModal(nodeData, e) }
                                disabled={ nodeData.id === 0 } icon={ <DeleteOutlined/> } type="link" danger>删除</Button>
                    </Space>
                </div>
            </div>
        )
    }

    //添加Modal
    let [insertVisible, setInsertVisible] = useState(false);
    //loading状态
    let [insertLoading, setInsertLoading] = useState(false);
    //当前操作的nodeData
    let [currentNode, setCurrentNode] = useState({});

    //打开添加Modal
    function handleOpenInsertModal(nodeData) {
        //缓存父级分类的数据
        setCurrentNode(nodeData);
        //显示Modal
        setInsertVisible(true);
    }

    // 获取Form的实例
    let [addForm] = Form.useForm();

    //添加分类
    async function handleInsert(values) {
        setInsertLoading(true);
        let { status, msg, data } = await Category.insert({ ...values, parent_id: currentNode.id });
        if (status) {
            //消息提示
            message.success(msg);
            //操作DOM
            originData.push({ ...data, ...values, parent_id: currentNode.id, key: data.id, title: values.name });
            setOriginData([...originData]);
            //转化为树形结构
            let treeData = convertTree_memoized(initTreeData, originData);
            setTreeData([...treeData]);
            //关闭Modal
            setInsertVisible(false);
        } else {
            message.error(msg);
        }
        setInsertLoading(false);
    }

    //编辑Modal
    let [editVisible, setEditVisible] = useState(false);
    //loading状态
    let [editLoading, setEditLoading] = useState(false);
    // 获取EditForm的实例
    let [editForm] = Form.useForm();

    // 打开编辑Modal
    function handleOpenEditModal(nodeData) {
        //缓存当前分类的数据
        setCurrentNode(nodeData);
        //还原表单数据
        editForm.setFieldsValue(nodeData);
        //显示Modal
        setEditVisible(true);
    }

    // 编辑分类
    async function handleEdit(values) {
        setEditLoading(true);
        let { status, msg } = await Category.edit({ ...currentNode, ...values })
        if (status) {
            //消息提示
            message.success(msg);
            //操作DOM
            let nodeData = originData.find((item) => item.id === currentNode.id);
            nodeData.name = values.name;
            nodeData.title = values.name;
            setOriginData([...originData]);
            //转化为树形结构
            let treeData = convertTree_memoized(initTreeData, originData);
            setTreeData([...treeData]);
            //关闭Modal
            setEditVisible(false);
        } else {
            message.error(msg);
        }
        setEditLoading(false);
    }

    //删除Modal
    let [removeVisible, setRemoveVisible] = useState(false);
    //loading状态
    let [removeLoading, setRemoveLoading] = useState(false);

    //打开删除Modal
    function handleOpenRemoveModal(nodeData) {
        //缓存当前分类的数据
        setCurrentNode(nodeData);
        //显示Modal
        setRemoveVisible(true);
    }

    //删除分类
    async function handleRemove() {
        setRemoveLoading(true);
        let { status, msg } = await Category.remove({ id: currentNode.id });
        if (status) {
            //消息提示
            message.success(msg);
            //操作DOM
            let index = originData.findIndex((item) => item.id === currentNode.id);
            originData.splice(index, 1);
            setOriginData([...originData]);
            //转化为树形结构
            let treeData = convertTree_memoized(initTreeData, originData);
            setTreeData([...treeData]);
            //关闭Modal
            setRemoveVisible(false);
        } else {
            message.error(msg);
        }
        setRemoveLoading(false);
    }

    return (
        <Card title="分类列表">
            <Tree titleRender={ handleTitleRender } treeData={ treeData } showLine={ { showLeafIcon: false } }/>
            {/* 添加模态框 */ }
            <Modal title="添加分类" visible={ insertVisible } onOk={ () => addForm.submit() }
                   confirmLoading={ insertLoading }
                   onCancel={ (e) => setInsertVisible(false) }>
                <Form onFinish={ handleInsert } form={ addForm }>
                    <Form.Item name="name" label="分类名称" rules={ [{ required: true, message: '请输入分类名称!' }] }>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
            {/* 编辑模态框 */ }
            <Modal title="编辑分类" visible={ editVisible } onOk={ () => editForm.submit() } confirmLoading={ editLoading }
                   onCancel={ (e) => setEditVisible(false) }>
                <Form onFinish={ handleEdit } form={ editForm }>
                    <Form.Item name="name" label="分类名称" rules={ [{ required: true, message: '请输入分类名称!' }] }>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
            {/*删除模态框*/ }
            <Modal title="删除确认" visible={ removeVisible } onOk={ handleRemove } confirmLoading={ removeLoading }
                   onCancel={ (e) => setRemoveVisible(false) }>
                <p>确定要删除此分类吗？</p>
            </Modal>
        </Card>
    )
}

export default List;