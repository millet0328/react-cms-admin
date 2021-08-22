import { useState, useEffect } from 'react';
import { Button, Card, Form, Input, Cascader, message } from "antd";
import { Article, Category } from '../../../api/';
import SingleUpload from "../../../components/SingleUpload";
import Editor from "../../../components/Editor";

function Release() {
    //form hook
    let [form] = Form.useForm();
    //文章分类
    let [options, setOptions] = useState([]);

    useEffect(() => {
        //获取一级分类
        async function loadCate_1st() {
            let cate_1st = await loadOptions(0);
            setOptions(cate_1st);
        }

        loadCate_1st();
    }, []);

    //加载下一级分类
    async function handleLoadSubcate(selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        let children = await loadOptions(targetOption.id);
        targetOption.loading = false;
        targetOption.children = children;
        setOptions([...options]);
    }

    //加载分类
    async function loadOptions(id) {
        let { status, data } = await Category.subcate({ id });
        if (status) {
            //转换数据格式
            return data.map((item) => {
                item.value = item.id;
                item.label = item.name;
                item.isLeaf = false;
                return item;
            });
        }
    }

    // 发布文章
    function handleRelease(values) {
        console.log(values);
    }

    return (
        <Card title="发布文章">
            <Form onFinish={ handleRelease } form={ form } labelCol={ { span: 2 } } wrapperCol={ { span: 22 } }>
                <Form.Item label="标题" name="title"
                           rules={ [
                               { required: true, message: '请输入文章标题！' },
                               { type: 'string', min: 3, message: '文章标题至少3个字符！' }
                           ] }>
                    <Input/>
                </Form.Item>
                <Form.Item label="描述" name="description"
                           rules={ [
                               { required: true, message: '请输入文章描述！' },
                               { type: 'string', min: 2, message: '文章描述至少2个字符！' }
                           ] }>
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item label="分类" name="category"
                           rules={ [{ required: true, message: '请选择文章分类！' }] }>
                    <Cascader options={ options } loadData={ handleLoadSubcate }
                              changeOnSelect/>
                </Form.Item>
                <Form.Item name="main_photo" label="主图"
                           rules={ [{ required: true, message: '请选择上传一张文章主图！' }] }>
                    <SingleUpload
                        action="/upload/common/"
                        data={ { type: 'common' } }
                        headers={ { Authorization: `Bearer ${ sessionStorage.token }` } }>
                    </SingleUpload>
                </Form.Item>
                <Form.Item label="内容" name="content" rules={ [{ required: true, message: '请输入文章内容！' }] }>
                    <Editor></Editor>
                </Form.Item>
                <Form.Item wrapperCol={ { offset: 2, span: 22 } }>
                    <Button type="primary" htmlType="submit">
                        发布文章
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Release;
