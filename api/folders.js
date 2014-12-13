var api = require('./api');
var projectTransformer = require('../utils/project-transformer');

function list(credentials){
	return api.request('data.getFolders', credentials).then(function(response){
		console.log("RES:");
		console.log(response);
		console.log("RESEND");

		var folders = projectTransformer.fromRequest(response.objects);

		return folders;
	});
}

function add(credentials, project){
	var payload = projectTransformer.toRequest([project]);
	return api.request('data.add', {objects: payload}, credentials).then(function(response){
		return projectTransformer.fromRequest(response.objects)[0];
	});
}

function update(credentials, project){
	var payload = projectTransformer.toRequest([project]);
	return api.request('data.change', {objects: payload}, credentials).then(function(response){
		return projectTransformer.fromRequest(response.objects)[0];
	});
}

function remove(credentials, id){
	var payload = {
		objects: {
			folder: {
				id: id
			}
		}
	};

	return api.request('data.delete', payload, credentials);
}

module.exports = {
	add: add,
	update: update,
	remove: remove,
	list: list
};