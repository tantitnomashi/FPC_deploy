import axios from 'axios';


const ngrokID = 'f58ef2ce31e9'
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
	login: (params) => instance.post('/v1/users/login', params),
	loadAdminDashboard: () => instance.get('/dashboard/info'),
	logout: () => instance.get('/user/logout'),


	// API for Cainet Model
	getCabitnet: () => instance.get('/v1/cabinets'),
	updateCabinet: (id, params) => {
		console.log('/v1/cabinets/' + id, params);
		return instance.post('/v1/cabinets/' + id, params)
	},
	createCabinet: (params) => instance.post('/v1/cabinets', params),
	deleteCabinet: (id) => instance.delete('/v1/cabinets/' + id),
	getBoxesInCabinet: (id) => instance.get('/v1/cabinets/' + id + '/boxes'),
	getCabinetById: (id) => instance.get('/v1/cabinets/' + id),


	// API for Cainet Template
	getCabitnetTemplate: () => instance.get('/v1/cabinet-templates'),
	getTemplateByCabinetId: (id) => instance.get('/v1/cabinets/' + id + '/template-info'),


	// API for Box 
	updateBoxStatus: (params) => instance.post('/v1/boxes/status/' + params.status + '?cabinetId=' + params.cabinetId + '&boxNum=' + params.boxNum),

	// API for Box Size Model
	getBoxSizes: () => instance.get('/v1/box-sizes'),
	createBoxSize: (params) => instance.post('/v1/box-sizes', params),
	deleteBoxSize: (id) => instance.delete('/v1/box-sizes/' + id),



	// API for User Model


	getUser: () => instance.get('/v1/users'),

	// API for Rental Transaction Model
	getTransaction: () => instance.get('/v1/rental-transactions'),
	//api/v1/rental-transactions/{id}/status/{statusCode}
	updateTransactionStatus: (id, status) => instance.post('/v1/rental-transactions/' + id + '/status/' + status),

	// API for Locations

	getLocation: () => instance.get('/v1/locations'),
	createLocation: (params) => instance.post('/v1/locations', params),

	// API for Rent Time Slot Model
	getTimeSlots: () => instance.get('/v1/rent-time-slots'),
	deleteTimeSlot: (id) => instance.delete('/v1/rent-time-slots/' + id),
	createTimeSlot: (params) => instance.post('/v1/rent-time-slots', params),


	detailRequest: (params) => instance.post('/request/post_fb_detail', params),
	getRequest: (requestId) => instance.get('/request/request_edit/' + requestId),
	editRequest: (params) => instance.post('/request/request_edit', params),
	getWallet: () => instance.get('/wallet/info'),
	getTrans: () => instance.get('/wallet/transactions'),
	request2FA: (params) => instance.post('/wallet/require-2fa', params),
	withdraw: (params) => instance.post('/wallet/withdraw', params),
}

export default adminApi;