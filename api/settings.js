var api = require('./api');

function list(credentials){
	return api.request('user.getSettings', credentials).then(function(response){
		var keys = response.keys;
		var values = response.values;

		return keys.map(function(key, i){
			return {name: key, value: values[i]};
		});
	});
}

function update(credentials, settingName, settingValue){
	return api.request('user.setSetting', {key: settingName, value: settingValue}, credentials);
}

module.exports = {
	list: list,
	update: update
};

