import { useState, useEffect } from 'react';
import { Button, Card, Form, Input, Cascader } from "antd";

function Release() {
    return (
        <Card title="发布文章">
            <Form labelCol={ { span: 2 } } wrapperCol={ { span: 22 } }>
                <Form.Item label="标题" name="title"
                           rules={ [
                               { required: true, message: '请输入文章标题！' },
                               { type: 'string', min: 3, message: '文章标题至少3个字符！' }
                           ] }>
                    <Input/>
                </Form.Item>
                <Form.Item label="描述" name="description"
                           rules={ [
                               { required: true, message: '请输入文章描述！' },
                               { type: 'string', min: 2, message: '文章描述至少2个字符！' }
                           ] }>
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item label="分类" name="category"
                           rules={ [{ required: true, message: '请选择文章分类！' }] }>
                    <Cascader/>
                </Form.Item>
                <Form.Item name="main_photo" label="主图"
                           rules={ [{ required: true, message: '请选择上传一张文章主图！' }] }>
                    <p>主图上传</p>
                </Form.Item>
                <Form.Item label="内容" name="content" rules={ [{ required: true, message: '请输入文章内容！' }] }>
                    <p>富文本编辑器</p>
                </Form.Item>
                <Form.Item wrapperCol={ { offset: 2, span: 22 } }>
                    <Button type="primary" htmlType="submit">
                        发布文章
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Release;
