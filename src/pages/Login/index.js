import { Card, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login() {
    return (
        <div className={ styles.bg }>
            <Card actions={ [<Link to="/register">注册账户</Link>, <Link to="/">忘记密码？</Link>,] } title="登录"
                  className={ styles["form-box"] }>
                <Form initialValues={ { username: "admin", password: 123 } }
                      labelCol={ { span: 4 } } wrapperCol={ { span: 20 } }>
                    <Form.Item label="账户" name="username" rules={ [
                        { required: true, message: '请输入账户名称!' },
                        { min: 3, message: '账户名称至少3个字符!' }
                    ] }>
                        <Input prefix={ <UserOutlined/> }/>
                    </Form.Item>
                    <Form.Item label="密码" name="password" rules={ [
                        { required: true, message: '请输入密码!' },
                        { pattern: /\d{3,}/, message: '密码至少3个数字!' }
                    ] }>
                        <Input.Password prefix={ <LockOutlined/> }/>
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