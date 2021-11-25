import { useEffect, useState } from 'react';
import { Button, Card, Cascader, Form, Input, message } from "antd";
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
            let cate_1st = await loadOptions(0, false);
            setOptions(cate_1st);
        }

        loadCate_1st();
    }, []);

    // 最大分类层数
    let MAX_LEVEL = 2;

    // 加载下一级分类
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
    const loadOptions = async (id, isLeaf) => {
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

    // 发布文章
    const handleRelease = async (values) => {
        values.cate_1st = values.category[0];
        values.cate_2nd = values.category[1];
        let { status, msg } = await Article.release(values);
        if (status) {
            message.success(msg);
        } else {
            message.error(msg);
        }
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
                    <Cascader options={ options } loadData={ handleLoadSubcate } changeOnSelect/>
                </Form.Item>
                <Form.Item name="main_photo" label="主图"
                           rules={ [{ required: true, message: '请选择上传一张文章主图！' }] }>
                    <SingleUpload action="/upload/common/" data={ { type: 'common' } }/>
                </Form.Item>
                <Form.Item label="内容" name="content" rules={ [{ required: true, message: '请输入文章内容！' }] }>
                    <Editor/>
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
