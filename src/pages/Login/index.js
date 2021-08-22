import { Card, Form, Input, Button, message } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './index.css';
import { Admin } from '../../api/';

function Login() {
    // 获取history实例
    let history = useHistory();
    // 获取location实例
    let location = useLocation();

    const handleFinish = async (values) => {
        let { status, msg, data } = await Admin.login(values);
        if (status) {
            message.success(msg);
            // 缓存数据
            sessionStorage.id = data.id;
            sessionStorage.role = data.role;
            sessionStorage.token = data.token;
            // 判断是否有重定向参数，跳转路由
            let redirect = new URLSearchParams(location.search).get('redirect');
            if (redirect) {
                history.replace(redirect);
            } else {
                history.replace('/article/list');
            }
        } else {
            message.error(msg);
        }
    };

    return (
        <div className="bg">
            <Card actions={ [<Link to="/register">注册账户</Link>, <Link to="/">忘记密码？</Link>,] } title="登录"
                  className="form-box">
                <Form onFinish={ handleFinish } initialValues={ { username: "admin", password: 123 } }
                      labelCol={ { span: 4 } } wrapperCol={ { span: 20 } }>
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