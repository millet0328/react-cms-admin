import axios from 'axios';
// 角色列表
let list = (params) => axios.get('/role/list', { params })

// 添加角色
let insert = (data) => axios.post('/role', data);

// 删除角色
let remove = (id, params) => axios.delete(`/role/${id}`, { params });

// 更新角色
let edit = (id, data) => axios.put(`/role/${id}`, data);


export default {
	list,
	remove,
	edit,
	insert,
}
