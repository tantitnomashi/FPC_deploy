import axios from 'axios';


const ngrokID = '71a53c875bc2'
const route_api = 'https://' + ngrokID + '.ngrok.io'
const instance = axios.create({
	baseURL: `${route_api}/api`,
	timeout: 5000,
	headers: {
	}
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


	// API for Cainet Model
	getCabitnet: () => instance.get('/v1/cabinets'),
	getCabitnetTemplate: () => instance.get('/v1/cabinet-templates'),
	updateCabinet: (id, params) => {
		console.log('/v1/cabinets/' + id, params);
		return instance.post('/v1/cabinets/' + id, params)
	},
	createCabinet: (params) => instance.post('/v1/cabinets', params),
	deleteCabinet: (id) => instance.delete('/v1/cabinets/' + id),


	// API for Box Size Model
	getBoxSizes: () => instance.get('/v1/box-sizes'),
	createBoxSize: (params) => instance.post('/v1/box-sizes', params),
	deleteBoxSize: (id) => instance.delete('/v1/box-sizes/' + id),

	// API for User Model


	getUser: () => instance.get('/v1/users'),
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