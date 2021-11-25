import { useState, useEffect } from 'react';
import { Card, Table, Image, Button, Space, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Article } from '../../../api/index';
import { Link } from 'react-router-dom';

function List() {
    // 加载数据
    let [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        async function fetchData() {
            let { status, data } = await Article.list({ pagesize: 20, pageindex: 1 });
            if (status) {
                setDataSource(data);
            }
        }

        fetchData();
    }, []);

    // 删除文章
    const handleRemove = async (i, id, e) => {
        let { status, msg } = await Article.remove({ id });
        if (status) {
            message.success(msg);
            // 更新state
            dataSource.splice(i, 1);
            setDataSource([...dataSource]);
        } else {
            message.error(msg);
        }
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '一级分类',
            dataIndex: 'cate_1st_name',
            key: 'cate_1st_name',
            width: 90,
        },
        {
            title: '二级分类',
            dataIndex: 'cate_2nd_name',
            key: 'cate_2nd_name',
            width: 90,
        },
        {
            title: '主图',
            dataIndex: 'main_photo',
            key: 'main_photo',
            render: (photo) => (<Image width={ 60 } src={ photo }/>)
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '发布日期',
            dataIndex: 'create_time',
            key: 'create_time',
            width: 160,
        },
        {
            title: '更新日期',
            dataIndex: 'update_time',
            key: 'update_time',
            width: 160,
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <Space>
                    <Link to={ `/article/edit/${ record.id }` }>
                        <Button type="primary" icon={ <EditOutlined/> } ghost>编辑</Button>
                    </Link>
                    <Popconfirm title="确定要删除此文章吗?" onConfirm={ (e) => handleRemove(index, record.id, e) }>
                        <Button icon={ <DeleteOutlined/> } danger>删除</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    return (
        <Card title="文章列表">
            <Table rowKey='id' dataSource={ dataSource } columns={ columns }/>;
        </Card>
    )
}

export default List;
