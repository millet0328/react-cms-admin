import { useState, useEffect } from 'react';
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload as UploadPhoto } from '../../api/';
import './index.css'

/*
* 单个图片上传组件
* 为了配合antd框架的Form组件，需要提供两个属性：
* value：初始化组件的值
* onChange：事件，向上传递数据
* action：图片上传api地址
* data：参数附加数据
* headers：自定义头部headers
* */
function SingleUpload({ value, onChange, action, data, headers }) {
    //控制图片显示
    let [photo, setPhoto] = useState('');
    // 生成文件列表
    let [fileList, setFileList] = useState([]);
    //loading状态
    let [loading, setLoading] = useState(false);
    //组件初始化
    useEffect(() => {
        setFileList([{
            uid: '-1',
            name: 'avatar.png',
            status: 'done',
            url: value,
            thumbUrl: value,
        }])
        setPhoto(value);
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
    };

    // 删除图片
    async function handleRemovePhoto(e) {
        //阻止冒泡
        e.stopPropagation();
        setLoading(true);
        let { status, msg } = await UploadPhoto.remove({ src: photo });
        if (status) {
            setLoading(false);
            // 向父级传递数据
            onChange('');
            message.success(msg);
        } else {
            message.error(msg);
        }
    }

    function PhotoPreview() {
        if (photo) {
            return (
                <div>
                    <div onClick={ handleRemovePhoto } className="cover"><DeleteOutlined/></div>
                    <img src={ photo } alt="上传图片" style={ { width: '100%' } }/>
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