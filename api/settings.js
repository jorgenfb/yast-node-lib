var api = require('./api');

function list(credentials){
	return api.request('user.getSettings', credentials).then(function(response){
		// TODO: transform
		return response;
	});
}

function update(credentials, settingName, settingValue){
	return api.request('user.setSetting', {key: settingName, value: settingValue}, credentials).then(function(response){
		// TODO: transform
		return response;
	});
}

module.exports = {
	list: list,
	update: update
};

