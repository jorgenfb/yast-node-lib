var user = require('./api/user');
var auth = require('./api/auth');
var settings = require('./api/settings');
var records = require('./api/records');
var projects = require('./api/projects');
var folders = require('./api/folders');

module.exports = {
	auth: auth,
	user: user,
	settings: settings,
	records: records,
	projects: projects,
	folders: folders
};