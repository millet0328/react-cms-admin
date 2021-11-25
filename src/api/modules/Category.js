import axios from 'axios';

// 获取子级分类
let subcate = (params) => axios.get('/category/sub', { params });

// 获取所有分类
let list = (params) => axios.get('/category/list', { params });

// 添加分类
let insert = (data) => axios.post('/category/add', data);

// 删除分类
let remove = (data) => axios.post('/category/remove', data);

// 编辑分类
let edit = (data) => axios.post('/category/edit', data);

let Category = {
    subcate,
    list,
    insert,
    remove,
    edit,
}
export default Category;
