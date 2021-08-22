import axios from 'axios';

// 普通用户列表
let list = (params) => axios.get('/user/list', { params })
// 删除用户
let remove = (data) => axios.post('/user/remove', data);
// 获取用户资料
let profile = (params) => axios.get('/user/info', { params });
// 编辑资料
let edit = (data) => axios.post('/user/info', data);

export default {
	list,
	remove,
	profile,
	edit,
}
