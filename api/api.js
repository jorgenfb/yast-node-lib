require('es6-promise').polyfill(); // Polyfill promises
require('isomorphic-fetch'); // Polyfill fetch

var apiErrors = require('../data/api-errors');
var baseUrl = 'http://www.yast.com/1.0/';

function createUrl(params){
	return baseUrl + '?lang=json&request=' + encodeURIComponent(JSON.stringify(params));
}

function extractData(response){
	var result = response.json()._result;

	if (result.status !== 0){
		console.log('Api error: ' + result.status);

		var error = new Error(apiErrors[result.status]);
		error.apiErrorCode = result.status;

		return Promise.reject(error);
	}

	return Promise.resolve(result.data);
}

function extractError(error){
	if (error.apiErrorCode){
		// Just pass along
		return Promise.reject(error);
	}

	// Fetch failed for some reason
	var message = 'Network error ' + response.status + ': ' + response.statusText;
	console.log('Got error: ' + message);
	return Promise.reject(new Error(message));
}

function request(req, data, credentials){
	if (credentials){
		data.user = credentials.user;
		data.hash = credentials.hash;
	}

	if (req !== 'auth.login' && !data.user && !data.hash){
		throw new Error('Missing credentials');
	}

	var url = createUrl({
		req: req,
		data: data
	});

	console.log('Request: ' + req + ' with payload:');
	console.log(url);

	return fetch(url)
		.then(extractData)
		.catch(extractError);
}

module.exports.request = request;
