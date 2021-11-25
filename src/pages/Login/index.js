import React, { useEffect } from "react";
import { Card, Form, Input, Button, message } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './index.module.css';
import { Admin } from '../../api/';

function Login() {
    // 获取navigate实例
    let navigate = useNavigate();
    // 获取地址栏query参数
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // 修改页面标题
        document.title = "登录";
        return () => {
            // 默认title
            document.title = "CMS管理系统";
        }
    });

    // 登录
    const handleFinish = async (values) => {
        let { status, msg, data } = await Admin.login(values);
        if (status) {
            message.success(msg);
            // 缓存数据
            sessionStorage.id = data.id;
            sessionStorage.role = data.role;
            sessionStorage.token = data.token;
            // 判断是否有重定向参数，跳转路由
            let redirect = searchParams.get('redirect');
            if (redirect) {
                navigate(redirect, { replace: true });
            } else {
                navigate('/article/list', { replace: true });
            }
        } else {
            message.error(msg);
        }
    };

    return (
        <div className={ styles.bg }>
            <Card actions={ [<Link to="/register">注册账户</Link>, <Link to="/">忘记密码？</Link>,] } title="登录"
                  className={ styles["form-box"] }>
                <Form onFinish={ handleFinish } initialValues={ { username: "admin", password: 123 } }
                      labelCol={ { span: 4 } } wrapperCol={ { span: 20 } } autoComplete="off">
                    <Form.Item label="账户" name="username" rules={ [
                        { required: true, message: '请输入账户名称!' },
                        { min: 3, message: '账户名称至少3个字符!' }
                    ] }>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="密码" name="password" rules={ [
                        { required: true, message: '请输入密码!' },
                        { pattern: /\d{3,}/, message: '密码至少3个数字!' }
                    ] }>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item wrapperCol={ { offset: 4, span: 20 } }>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login;