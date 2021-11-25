import axios from 'axios';

// 文章列表
let list = (params) => axios.get('/article/list', { params });

// 发布文章
let release = (data) => axios.post('/article/release', data);

// 删除文章
let remove = (data) => axios.post('/article/remove', data);

// 编辑文章
let edit = (data) => axios.post('/article/edit', data);

// 获取文章详情
let detail = (params) => axios.get('/article/detail', { params });

let Article = {
    list,
    release,
    remove,
    edit,
    detail,
}
export default Article;
