import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
    FileProtectOutlined,
    TeamOutlined,
    ContactsOutlined,
    PartitionOutlined,
    UngroupOutlined,
    SettingOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

function SideMenu() {
    return (
        <Menu defaultOpenKeys={ ['article'] } mode="inline" theme="dark">
            <SubMenu key="article" icon={ <FileProtectOutlined/> } title="文章管理">
                <Menu.Item key="article-1">
                    <Link to="/article/release">发布文章</Link>
                </Menu.Item>
                <Menu.Item key="article-2">
                    <Link to="/article/list">文章列表</Link>
                </Menu.Item>
            </SubMenu>

            <Menu.Item key="category" icon={ <PartitionOutlined/> }>
                <Link to="/category/list">分类管理</Link>
            </Menu.Item>

            <SubMenu key="user" icon={ <TeamOutlined/> } title="用户管理">
                <Menu.Item key="user-1">
                    <Link to="/user/list">用户列表</Link>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="admin" icon={ <ContactsOutlined/> } title="管理员管理">
                <Menu.Item key="admin-1">
                    <Link to="/admin/list">管理员列表</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="auth" icon={ <UngroupOutlined/> } title="权限管理">
                <Menu.Item key="auth-1">
                    <Link to="/auth/list">权限角色</Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="settings" icon={ <SettingOutlined/> }>
                <Link to="/admin/setting">账户设置</Link>
            </Menu.Item>
        </Menu>
    )
}

export default SideMenu;
