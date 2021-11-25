import React from "react";
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import NavBar from "../NavBar/";
import SideMenu from "../SideMenu";

const { Header, Sider, Content } = Layout;

function Framework() {
    return (
        <Layout>
            <Header style={ { padding: '0 10px' } }>
                <NavBar/>
            </Header>
            <Layout>
                <Sider style={ { minHeight: "calc( 100vh - 64px )" } }>
                    <SideMenu/>
                </Sider>
                <Content>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Framework;