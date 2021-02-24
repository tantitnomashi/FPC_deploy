import axios from 'axios';

//const route_api = ''
const route_api = 'http://127.0.0.1:8000'
const instance = axios.create({
	baseURL: `${route_api}/api/`,
	timeout: 5000,
	headers: { authorization: localStorage.getItem('fpc_admin_token') }
});

const adminApi = {
	route: `${route_api}/api`,
	instance,
	notify: (message, type) => {
		window.$.notify({
			// options
			message
		}, {
			// settings
			type,
			delay: 3000,
		});
	},
	login: (params) => instance.post('/login', params),
	loadAdminDashboard: () => instance.get('/dashboard/info'),
	loadAdminChartWeek: () => instance.get('/dashboard/week'),
	logout: () => instance.get('/user/logout'),
	getCabitnet: () => instance.get('/dashboard/cabinet'),
	getUser: () => instance.get('/dashboard/user'),
	getTransaction: () => instance.get('/dashboard/transaction'),
	detailRequest: (params) => instance.post('/request/post_fb_detail', params),
	getRequest: (requestId) => instance.get('/request/request_edit/' + requestId),
	editRequest: (params) => instance.post('/request/request_edit', params),
	getWallet: () => instance.get('/wallet/info'),
	getTrans: () => instance.get('/wallet/transactions'),
	request2FA: (params) => instance.post('/wallet/require-2fa', params),
	withdraw: (params) => instance.post('/wallet/withdraw', params),
}

export default adminApi;