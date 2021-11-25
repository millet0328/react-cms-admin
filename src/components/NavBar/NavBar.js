import React, { useEffect } from "react";
import { Row, Col, Menu, Avatar, Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import logo from './img/logo.png';
import { Link, useNavigate } from 'react-router-dom'

const { SubMenu } = Menu;

function NavBar({ isCollapsed, profile, onToggle, onLoadProfile }) {
    useEffect(() => {
        // 提取当前登录账户的id
        let id = sessionStorage.id;
        onLoadProfile(id);
    }, [onLoadProfile])

    // 获取路由实例
    let navigate = useNavigate();
    // 退出登录
    function handleLogout() {
        // 清空缓存
        sessionStorage.clear();
        // 跳转登录
        navigate('/login', { replace: true });
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
                        <Menu.Item key="account">
                            <Link to="/admin/setting">账户设置</Link>
                        </Menu.Item>
                        <Menu.Item key="message">消息通知</Menu.Item>
                        <Menu.Item onClick={ handleLogout } key="logout">退出登录</Menu.Item>
                    </SubMenu>
                </Menu>
            </Col>
        </Row>
    )
}

export default NavBar;