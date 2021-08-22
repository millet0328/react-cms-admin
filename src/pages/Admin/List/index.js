import { Card, Table, Image, Button, Space, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function List() {
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
            render: (photo) => ( <Image width={ 60 } src={ photo }/> )
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <Space>
                    <Button type="primary" icon={ <EditOutlined/> } size="middle" ghost>编辑</Button>
                    <Button icon={ <DeleteOutlined/> } danger size="middle">删除</Button>
                </Space>
            )
        },
    ];
    return (
        <Card title="管理员列表">
            <Table rowKey='id' columns={ columns }/>;
        </Card>
    )
}

export default List;
