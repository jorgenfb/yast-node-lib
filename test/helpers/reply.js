var nock = require('nock');

function reply(status, response){
	return nock('http://www.yast.com')
		.filteringPath(function(path){return '/ABC';})
		.get('/ABC')
		.reply(status, function(){
			return response;
		});
}

function withData(data) {
	return reply(200, {status: 0, data: data});
}

reply.withData = withData;

module.exports = reply;
