require('es6-promise').polyfill(); // Polyfill promises
require('isomorphic-fetch'); // Polyfill fetch
var http = require('http');

var apiErrors = require('../data/api-errors');
var baseUrl = 'http://www.yast.com/1.0/';

function createUrl(params){
	return baseUrl + '?lang=json&request=' + encodeURIComponent(JSON.stringify(params));
}

function request(req, data, credentials){
	return new Promise(function(resolve, reject){
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

		http.get(url, function(res){
			res.setEncoding('utf8');

			var msg = '';
			res.on('data', function(chunk) {
		    	msg += chunk;
		  	});
		  	res.on('end', function() {
		  		var result = JSON.parse(msg);
		  		if (result.status !== 0){
		  			console.log('Api error: ' + result.status);

					var error = new Error(apiErrors[result.status]);
					error.apiErrorCode = result.status;

					reject(error);
		  		} else {
		  			console.log(result.data);
			    	resolve(result.data);
		  		}
		  	});
		}).on('error', function(e){
			reject(e);
		});
	});
}

module.exports.request = request;
