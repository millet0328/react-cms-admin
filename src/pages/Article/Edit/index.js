import { useState, useEffect } from 'react';
import { Button, Card, Form, Input, Cascader, message } from "antd";
import { Article, Category } from '../../../api/';
import { useParams } from 'react-router-dom';
import Editor from "../../../components/Editor";
import SingleUpload from "../../../components/SingleUpload";

function Edit() {
    //获取路由参数
    let { id } = useParams();
    //获取Form实例
    let [form] = Form.useForm();

    // 获取文章详情
    async function loadDetail(id) {
        let { status, data } = await Article.detail({ id });
        if (status) {
            // 添加选中分类数据
            data.category = [data.cate_1st, data.cate_2nd];
            return data;
        }
    }

    useEffect(() => {
        async function initDetail() {
            //1、获取文章详情
            let article = await loadDetail(id);
            //2、获取一级分类
            let cate_1st = await loadOptions(0);
            //3、获取二级分类
            let children = await loadOptions(article.cate_1st);
            // 查找选中的一级分类,附加二级分类
            let selectedOption = cate_1st.find((item) => item.id === article.cate_1st);
            selectedOption.children = children;
            setOptions(cate_1st);
            // 还原整个表单
            form.setFieldsValue(article);
        }

        initDetail();
    }, [id, form]);


    //文章分类
    let [options, setOptions] = useState([]);

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

    // 编辑文章
    function handleEdit(values) {
        console.log(values);
    }

    return (
        <Card title="编辑文章">
            <Form onFinish={ handleEdit } form={ form } labelCol={ { span: 2 } } wrapperCol={ { span: 22 } }>
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
                <Form.Item label="内容" name="content"
                           rules={ [{ required: true, message: '请输入文章内容！' }] }>
                    <Editor></Editor>
                </Form.Item>
                <Form.Item wrapperCol={ { offset: 2, span: 22 } }>
                    <Button type="primary" htmlType="submit">
                        保存修改
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit;
