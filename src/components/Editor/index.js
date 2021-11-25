import Wangeditor from 'wangeditor';
import { useEffect } from "react";

let editor = null;

/*
* 为了配合antd框架的Form组件，需要提供两个属性：
* value：组件的值
* onChange：事件，向上传递数据
* */
function Editor({ value, onChange }) {
    // componentDidMount：挂载
    useEffect(() => {
        editor = new Wangeditor("#editor");
        //同步更新
        editor.config.onchange = (newHtml) => {
            onChange(newHtml)
        }
        // 配置 server 接口地址
        editor.config.uploadImgServer = '/upload/editor/';
        // 限制类型
        editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png'];
        // 设置token
        editor.config.uploadImgHeaders = { Authorization: `Bearer ${ sessionStorage.token }` };
        // 自定义filename
        editor.config.uploadFileName = 'file';

        editor.create();

        return () => {
            // 组件销毁时销毁编辑器
            editor.destroy()
        }
    }, [onChange]);
    // componentDidUpdate：更新
    useEffect(() => {
        //编辑器无任何内容，初始化编辑器赋值
        if (!editor.txt.html()) {
            editor.txt.html(value);
        }
    }, [value]);
    return (
        <div>
            <div id="editor"></div>
        </div>
    )
}

export default Editor;