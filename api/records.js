var api = require('./api');
var recordTransformer = require('../utils/record-transformer');

function search(credentials, params){
	return api.request('data.getRecords', params, credentials).then(function(response){
		return recordTransformer.fromRequest(response.objects);
	});
}

function add(credentials, record){
	var payload = recordTransformer.toRequest([record]);
	return api.request('data.add', payload, credentials).then(function(response){
		return recordTransformer.fromRequest(response.objects)[0];
	});
}

function update(credentials, record){
	var payload = recordTransformer.toRequest([record]);
	return api.request('data.change', payload, credentials).then(function(response){
		return recordTransformer.fromRequest(response.objects)[0];
	});
}

function remove(credentials, id){
	var payload = {
		objects: {
			record: {
				id: id
			}
		}
	};

	return api.request('data.delete', payload, credentials);
}

function types(credentials){
	return api.request('meta.getRecordTypes', credentials).then(function(data){
        // Create associative map of types. Using type id as key.
        var types = {};

        // Extract types from the response structure
        data.objects.forEach(function(obj){
			// unwrap
			var type = obj.recordType;

			// Unwrap types
			type.variableTypes = type.variableTypes.map(function(wrapper){
			return wrapper.variableType;
			});

			// Store in hashmap
			types[type.id] = type;
        });

        return types;
    });
}

module.exports = {
	add: add,
	update: update,
	remove: remove,
	search: search,
	types: types
};