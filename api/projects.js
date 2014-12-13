var api = require('./api');
var projectTransformer = require('../utils/project-transformer');

function list(credentials){
	return api.request('data.getProjects', credentials).then(function(response){
		return projectTransformer.fromRequest(response.objects);
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
			project: {
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