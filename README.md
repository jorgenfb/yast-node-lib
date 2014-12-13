Yast node library
=============

A wrapper around [Yast.com API](http://www.yast.com/wiki/index.php/API).

Usage
-----
All library methods returns a Promise.

### Auth
yast.auth.login(username, password)

### User
yast.user.info(credentials)
yast.user.updatePassword(credentials, newPassword)

### Settings
yast.settings.list(credentials)
yast.settings.update(credentials, settingName, settingValue)

### Records
yast.records.add(credentials, record)
yast.records.update(credentials, record)
yast.records.remove(credentials, id)
yast.records.search(credentials, params)
yast.records.types(credentials)

### Projects
yast.projects.add(credentials, project)
yast.projects.update(credentials, project)
yast.projects.remove(credentials, id)
yast.projects.list(credentials)

### Folders
yast.folders.add(credentials, folder)
yast.folders.update(credentials, folder)
yast.folders.remove(credentials, id)
yast.folders.list(credentials)

### Example
```
var yast = require('yast-lib');

// Log in
var user = "username";
var password = "password"
yast.login(username, password).then(function(response){
	var credentials	= {
		user: user,
		hash: response.hash
	}

	// Print name of user
	yast.user.info(credentials)
		.then(function(info){
			console.log("Hi, my name is " + info.name);
		});

	// Add new project to first folder found
	yast.folders.list(credentials)
		.then(function(folders){
			return folders[0]; // take first folder
		})
		.then(function(firstFolder){
			var newProject = {
				parentId: firstFolder.id
				name: "My new project"
			};

			return yast.projects.add(newProject)
		}).then(function(project){
			console.log("Created new project " + newProject.name);
		});
});
```