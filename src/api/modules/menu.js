import axios from 'axios';

// 侧边栏菜单
let sideMenu = (params) => axios.get('/menu/tree', { params });

export default {
	sideMenu,
}
