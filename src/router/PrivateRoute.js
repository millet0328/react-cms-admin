// 判断是否登录，重定向
import { Redirect, Route } from "react-router-dom";
import { notification } from "antd";

function PrivateRoute({ children, ...rest }) {
    // 提取token
    let token = sessionStorage.token;
    return (
        <Route { ...rest } render={
            ({ location }) => {
                if (location.pathname === '/') {
                    return (
                        <Redirect to="/login"/>
                    )
                }
                if(!token){
                    return (
                        <Redirect
                            to={ {
                                pathname: "/login",
                                search: `redirect=${ location.pathname }`,
                            } }
                        />
                    )
                }
                return children;
            }
        }/>
    )
}

export default PrivateRoute;