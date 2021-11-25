import React from "react";
import { Layout } from 'antd';
import NavBar from "../NavBar/";
import SideMenu from "../SideMenu";
import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

function Framework({ isCollapsed }) {
    return (
        <Layout>
            <Header style={ { padding: '0 10px' } }>
                <NavBar/>
            </Header>
            <Layout>
                <Sider collapsed={ isCollapsed } style={ { minHeight: "calc( 100vh - 64px )" } }>
                    <SideMenu/>
                </Sider>
                <Content style={ { padding: '10px' } }>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Framework;