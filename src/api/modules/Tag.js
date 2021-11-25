import axios from 'axios';

// 获取所有标签
let list = (params) => axios.get('/tag/list', { params });

// 添加标签
let insert = (data) => axios.post('/tag/', data);

// 删除标签
let remove = (id, params) => axios.delete(`/tag/${ id }`, { params });

// 编辑标签
let edit = (id, data) => axios.put(`/tag/${ id }`, data);

let Tag = {
    list,
    insert,
    remove,
    edit,
}
export default Tag;
