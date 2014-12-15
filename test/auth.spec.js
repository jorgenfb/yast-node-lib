var expect = require('chai').expect;
var reply = require('./helpers/reply');
var auth = require('../api/auth');

describe('Auth module', function(){
	it('Should return an hash code', function(){
          reply.withData({hash: 'ABC'});

		return auth.login('myUserName', 'myPassword').then(function(response){
               console.log('Hei');
               expect(response).to.have.property('hash').equals('ABC');
		});
	});
});
