import { Card, Table, Image, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function List() {
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
                    <Button type="primary" icon={ <EditOutlined/> } size="middle">编辑</Button>
                    <Button icon={ <DeleteOutlined/> } danger size="middle">删除</Button>
                </Space>
            )
        },
    ];
    return (
        <Card title="文章列表">
            <Table columns={ columns }/>;
        </Card>
    )
}

export default List;
