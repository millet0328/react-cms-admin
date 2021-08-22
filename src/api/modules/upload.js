import axios from 'axios';

// 删除图片
const remove = (data) => axios.post('/upload/remove', data);

export default {
	remove,
}
