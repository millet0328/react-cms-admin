import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button, Card, Form, Input, Radio } from "antd";
import { User } from '../../../api/';

function Edit() {
    //获取参数
    let { id } = useParams();
    //获取Form实例
    let [form] = Form.useForm();
    // componentDidMount,componentDidUpdate,监听路由参数
    useEffect(() => {
        //加载用户资料
        async function loadDetail() {
            let { status, data } = await User.profile({ id });
            if (status) {
                // 还原表单数据
                form.setFieldsValue(data);
            }
        }

        loadDetail();
    }, [id, form]);

    return (
        <Card title="编辑用户">
            <Form labelCol={ { span: 2 } } wrapperCol={ { span: 22 } } form={ form }>
                <Form.Item label="用户名" name="username"
                           rules={ [
                               { required: true, message: '请输入用户名称！' },
                               { type: 'string', min: 3, message: '请输入至少3个字符！' }
                           ] }>
                    <Input disabled/>
                </Form.Item>
                <Form.Item label="昵称" name="nickname"
                           rules={ [
                               { required: true, message: '请输入您的昵称！' },
                               { type: 'string', min: 2, message: '请输入至少2个字符！' }
                           ] }>
                    <Input/>
                </Form.Item>
                <Form.Item label="性别" name="sex"
                           rules={ [
                               { required: true, message: '请选择性别！' },
                           ] }>
                    <Radio.Group>
                        <Radio value="男">男</Radio>
                        <Radio value="女">女</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="手机" name="tel"
                           rules={ [
                               { required: true, message: '请输入手机号码！' },
                               { pattern: /^1[3456789]\d{9}$/, message: '请输入11位手机号码！' }
                           ] }>
                    <Input/>
                </Form.Item>
                <Form.Item wrapperCol={ { offset: 2, span: 22 } }>
                    <Button type="primary" htmlType="submit">
                        保存修改
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit;
