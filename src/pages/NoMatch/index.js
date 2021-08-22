import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function NoMatch() {
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