var api = require('./api');

function login(user, password){
	return api.request('auth.login', {user: user, password: password});
}

module.exports.login = login;