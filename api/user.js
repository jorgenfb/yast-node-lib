var api = require('./api');

function info(credentials){
	return api.request('user.getInfo', credentials);
}

function updatePassword(credentials, newPassword){
	return api.request('user.setPassword', {password: newPassword}, credentials);
}

module.exports = {
	info: info,
	updatePassword: updatePassword
};

