import { Button, Card, Form, Input, Radio } from "antd";

function Edit() {
    return (
        <Card title="编辑管理员">
            <Form labelCol={ { span: 2 } } wrapperCol={ { span: 22 } }>
                <Form.Item label="用户名" name="username"
                           rules={ [
                               { required: true, message: '请输入用户名称！' },
                               { type: 'string', min: 3, message: '请输入至少3个字符！' }
                           ] }>
                    <Input disabled/>
                </Form.Item>
                <Form.Item label="姓名" name="fullname"
                           rules={ [
                               { required: true, message: '请输入您的姓名！' },
                               { type: 'string', min: 2, message: '请输入至少2个字符！' }
                           ] }>
                    <Input/>
                </Form.Item>
                <Form.Item label="性别" name="sex"
                           rules={ [{ required: true, message: '请选择性别！' }] }>
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
                <Form.Item label="邮箱" name="email"
                           rules={ [
                               { required: true, message: '请输入电子邮件地址！' },
                               {
                                   pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                                   message: '请输入合法的电子邮件地址！'
                               }
                           ] }>
                    <Input/>
                </Form.Item>
                <Form.Item label="头像" name="avatar" rules={ [{ required: true, message: '请选择上传一张头像！' }] }>
                    <p>头像</p>
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
