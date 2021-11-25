import { Navigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function RequireAuth({ children, ...rest }) {
    let { pathname } = useLocation();
    // 提取token
    let token = sessionStorage.token;
    // 判断是否登录，重定向至登录页面
    if (!token) {
        return <Navigate to={ `/login?redirect=${ pathname }` } replace={ true }/>;
    }
    return children;
}

export default RequireAuth;