import { Row, Col, Menu, Space } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';
import logo from './img/logo.png';
import Avatar from "antd/es/avatar/avatar";

const { SubMenu } = Menu;

function NavBar() {
    return (
        <Row justify="space-between" align="center">
            <Col>
                <Row justify="space-between" align="center">
                    <Col>
                        <img src={ logo } height="50" alt=""/>
                    </Col>
                    <Col>
                        <MenuFoldOutlined style={ { color: "white" } }/>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Menu mode="horizontal" theme="dark">
                    <Menu.Item key="preview">
                        预览网站
                    </Menu.Item>
                    <Menu.Item key="setting">
                        网站配置
                    </Menu.Item>
                    <SubMenu key="SubMenu" title={
                        <Space align="center">
                            <Avatar src="https://joeschmoe.io/api/v1/random"/>
                            <span className="fullname">黄小米</span>
                        </Space>
                    }>
                        <Menu.Item key="account">账户设置</Menu.Item>
                        <Menu.Item key="message">消息通知</Menu.Item>
                        <Menu.Item key="logout">退出登录</Menu.Item>
                    </SubMenu>
                </Menu>
            </Col>
        </Row>
    )
}

export default NavBar;