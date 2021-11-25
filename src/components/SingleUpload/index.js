import { useState, useEffect } from 'react';
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload as UploadPhoto } from '../../api/';
import './index.css'

/*
* 单个图片上传组件
* 自定义或第三方的表单控件，为了配合antd框架的Form组件。只要该组件遵循以下的约定：
* 1、提供受控属性 value 或其它与 valuePropName 的值同名的属性。
* 2、提供 onChange 事件或 trigger 的值同名的事件。
* value：当前Upload组件已经上传的图片地址
* onChange：[事件] 用来通知父级组件，向上传递数据
* action：图片上传api地址
* data：参数附加数据，默认值：{ type: "avatar" }
* headers：自定义头部headers
* defaultPhoto：默认图片。如果是默认图片，不做物理删除。
* */
function SingleUpload({
                          value,
                          action,
                          defaultPhoto = "/images/avatar/default.jpg",
                          data = { type: "avatar" },
                          headers = {},
                          onChange,
                      }) {
    // 默认 headers
    let defaultHeaders = { Authorization: `Bearer ${ sessionStorage.token }` };
    // 合并 headers
    headers = { ...defaultHeaders, ...headers };

    // 生成文件列表
    let [fileList, setFileList] = useState([]);
    //组件初始化
    useEffect(() => {
        setFileList([{
            uid: '-1',
            name: 'avatar.png',
            status: 'done',
            url: value,
            thumbUrl: value,
        }])
    }, [value]);

    //上传之前校验
    function handleBeforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('您只能上传 JPG/PNG 格式的图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片必须小于2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    //loading状态
    let [loading, setLoading] = useState(false);

    // 头像上传
    function handlePhotoChange({ file, fileList }) {
        let { status, response } = file;
        switch (status) {
            case 'uploading':
                setLoading(true);
                break;
            case 'done':
                setLoading(false);
                message.success(response.msg);
                // 向父级传递数据
                onChange(response.src);
                break;
            case 'error':
                setLoading(false);
                message.error(response.msg);
                break;
            default:
                break;
        }
    }

    // 删除图片
    async function handleRemovePhoto(e) {
        //阻止冒泡
        e.stopPropagation();
        // 开启loading
        setLoading(true);
        // 判断是否默认头像
        let isDefault = value.includes(defaultPhoto);
        // 不是默认图片，将物理删除图片
        if (!isDefault) {
            let { status, msg } = await UploadPhoto.remove({ src: value });
            if (status) {

                message.success(msg);
            } else {
                message.error(msg);
            }
        }
        // 关闭loading
        setLoading(false);
        // 无论是否物理删除，向父级传递空数据，清空图片
        onChange('');
    }

    function PhotoPreview() {
        if (value) {
            return (
                <div>
                    <div onClick={ handleRemovePhoto } className="cover"><DeleteOutlined/></div>
                    <img src={ value } alt="上传图片" style={ { width: '100%' } }/>
                </div>
            )
        } else {
            return (
                <div>
                    { loading ? <LoadingOutlined/> : <PlusOutlined/> }
                </div>
            )
        }
    }

    return (
        <Upload
            name="file"
            listType="picture-card"
            className="photo-uploader"
            defaultFileList={ fileList }
            showUploadList={ false }
            beforeUpload={ handleBeforeUpload }
            onChange={ handlePhotoChange }
            action={ action }
            data={ data }
            headers={ headers }
        >
            <PhotoPreview/>
        </Upload>
    )
}

export default SingleUpload;