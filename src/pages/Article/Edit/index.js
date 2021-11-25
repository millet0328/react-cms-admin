import { useState, useEffect } from 'react';
import { Button, Card, Form, Input, Cascader, message } from "antd";
import { Article, Category } from '../../../api/';
import { useNavigate, useParams } from 'react-router-dom';
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
            let cate_1st = await loadOptions(0, false);
            //3、获取二级分类
            let children = await loadOptions(article.cate_1st, true);
            // 查找选中的一级分类,附加二级分类
            let selectedOption = cate_1st.find((item) => item.id === article.cate_1st);
            selectedOption.children = children;
            setOptions(cate_1st);
            // 还原整个表单
            form.setFieldsValue(article);
        }

        initDetail();
    }, [id, form]);


    // 最大分类层数
    let MAX_LEVEL = 2;
    //文章分类
    let [options, setOptions] = useState([]);

    //加载下一级分类
    const handleLoadSubcate = async (selectedOptions) => {
        let { length } = selectedOptions;
        // 根据selectedOptions判断当前是几级分类
        let level = length + 1;
        // 数组最后一项 即为 你最近选中的分类
        const targetOption = selectedOptions[length - 1];
        // 请求下一级分类
        targetOption.loading = true;
        targetOption.children = await loadOptions(targetOption.id, level === MAX_LEVEL);
        targetOption.loading = false;
        setOptions([...options]);
    }

    //加载分类
    async function loadOptions(id, isLeaf) {
        let { status, data } = await Category.subcate({ id });
        if (status) {
            //转换数据格式
            return data.map((item) => {
                item.value = item.id;
                item.label = item.name;
                item.isLeaf = isLeaf;
                return item;
            });
        }
    }

    // 获取路由
    let navigate = useNavigate();
    // 编辑文章
    const handleEdit = async (values) => {
        values.cate_1st = values.category[0];
        values.cate_2nd = values.category[1];
        let { status, msg } = await Article.edit({ id, ...values });
        if (status) {
            // 消息提示
            message.success(msg);
            // 跳转路由
            navigate(-1, { replace: true });
        } else {
            message.error(msg);
        }
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
                    <Cascader options={ options } loadData={ handleLoadSubcate } changeOnSelect/>
                </Form.Item>
                <Form.Item name="main_photo" label="主图"
                           rules={ [{ required: true, message: '请选择上传一张文章主图！' }] }>
                    <SingleUpload action="/upload/common/" data={ { type: 'common' } }/>
                </Form.Item>
                <Form.Item label="内容" name="content"
                           rules={ [{ required: true, message: '请输入文章内容！' }] }>
                    <Editor/>
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
