import React, { useEffect } from "react";
import { Row, Col, Menu, Avatar, Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import logo from './img/logo.png';
import { useHistory } from 'react-router-dom'

const { SubMenu } = Menu;

function NavBar({ isCollapsed, profile, onToggle, onLoadProfile }) {
    //componentDidMount挂载
    useEffect(() => {
        // 提取当前登录账户的id
        let id = sessionStorage.id;
        onLoadProfile(id);
    }, [])

    //退出登录
    let history = useHistory();

    function handleLogout() {
        // 清空缓存
        sessionStorage.clear();
        // 跳转登录
        history.replace('/login');
    }

    return (
        <Row justify="space-between" align="center">
            <Col>
                <Row justify="space-between" align="center">
                    <Col>
                        <img src={ logo } height="50" alt=""/>
                    </Col>
                    <Col onClick={ (e) => onToggle(e) } style={ { color: "white" } }>
                        { isCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> }
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
                    <SubMenu key="SubMenu"
                             title={
                                 <Space align="center">
                                     <Avatar src={ profile.avatar }/>
                                     <span className="fullname">{ profile.fullname }</span>
                                 </Space>
                             }>
                        <Menu.Item key="account">账户设置</Menu.Item>
                        <Menu.Item key="message">消息通知</Menu.Item>
                        <Menu.Item onClick={ handleLogout } key="logout">退出登录</Menu.Item>
                    </SubMenu>
                </Menu>
            </Col>
        </Row>
    )
}

export default NavBar;