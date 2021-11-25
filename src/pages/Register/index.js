import React, { useEffect } from "react";
import { Card, Form, Input, Button, Radio, message } from 'antd';
import styles from './index.module.css';

import { Link, useNavigate } from 'react-router-dom';
import { Admin } from '../../api/';

function Register() {
    // 获取navigate实例
    let navigate = useNavigate();

    useEffect(() => {
        // 修改页面标题
        document.title = "注册";
        return () => {
            // 默认title
            document.title = "CMS管理系统";
        }
    });

    const handleFinish = async (values) => {
        let { status, msg, data } = await Admin.register(values);
        if (status) {
            message.success(msg);
            // 缓存数据
            sessionStorage.id = data.id;
            sessionStorage.role = data.role;
            sessionStorage.token = data.token;
            navigate('/article/list', { replace: true });
        } else {
            message.error(msg);
        }
    };

    return (
        <div className={ styles.bg }>
            <Card actions={ [<Link to="/login">登录账户</Link>, <Link to="/">忘记密码？</Link>,] } title="注册"
                  className={ styles["form-box"] }>
                <Form onFinish={ handleFinish } labelCol={ { span: 6 } } wrapperCol={ { span: 18 } }>
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
                    <Form.Item label="确认密码" name="confirm password" dependencies={ ['password'] } hasFeedback rules={ [
                        { required: true, message: '请确认密码!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不匹配!'));
                            },
                        }),
                    ] }>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item label="姓名" name="fullname" rules={ [
                        { required: true, message: '请输入姓名!' },
                        { min: 2, message: '账户名称至少2个字符!' }
                    ] }>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="性别" name="sex" rules={ [
                        { required: true, message: '请选择性别!' },
                    ] }>
                        <Radio.Group>
                            <Radio value="男">男</Radio>
                            <Radio value="女">女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="手机" name="tel" rules={ [
                        { required: true, message: '请输入手机号码!' },
                        {
                            pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
                            message: '请输入11位手机号码！'
                        }
                    ] }>
                        <Input/>
                    </Form.Item>
                    <Form.Item wrapperCol={ { offset: 6, span: 18 } }>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Register;