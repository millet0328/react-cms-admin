import { useEffect } from "react";
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function NoMatch() {
    useEffect(() => {
        // 修改页面标题
        document.title = "404页面";
        return () => {
            // 默认title
            document.title = "CMS管理系统";
        }
    });
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, 您访问的页面不存在！"
            extra={ <Link to="/login"><Button type="primary">回到主页</Button></Link> }
        />
    )
}

export default NoMatch;