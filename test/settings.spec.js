var expect = require('chai').expect;
var reply = require('./helpers/reply');
var settings = require('../api/settings');

var mockResponse = require('./data/response-settings');

describe('Settings module', function(){
	it('Should return an array of settings objects', function(){
          reply.withData(mockResponse);

		return settings.list({user: 'A', hash: 'B'}).then(function(settings){
			expect(Array.isArray(settings)).to.be.true();
		});
	});
});
