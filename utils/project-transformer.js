var timeUtils = require('./time-utils');
/**
 * Prepares a list of project to be sendt to the server.
 *
 * @param  {Array} projects list of project or folder
 * @return {Array} wrapped objects ready to be sent to server.
 */
function projectsToRequest(projects){
  return projects.map(function(project){
   	if (!project.name) {
   		throw new Error('Missing project name');
   	}

  	var rp = {
  		id: '',
  		name: project.name
  	};

  	// Add id
  	if (project.id){
  		rp.id = project.id + '';
  	}

  	// Parentid
  	rp.parentId = (project.parentId ? project.parentId : 0) + '';

  	// Creator
  	if (project.creatorId){
  		rp.creator = parent.creatorId + '';
  	}

  	// Privileges
  	if (project.privileges){
  		rp.privileges = project.privileges + '';
  	}

  	if (project.timeCreated){
  		rp.timeCreated = project.timeCreated + '';
  	}

  	rp.description = project.description || '';
  	rp.primaryColor = project.primaryColor || '#008000';

    var wrapper = {};
    wrapper[project.isFolder ? 'folder' : 'project'] = rp;
    return wrapper;
  });
}

/**
 * Transforms projects/folders from a request into proper data models
 *
 * @param  {Object} data response from server
 * @return {Array} array of projects / folders
 */
function projectsFromRequest(data){
	return data.map(function(o){
		var project;
		if (o.folder){
			project = o.folder;
			project.isFolder = true;
		} else {
			project = o.project;
		}

    // Fix types
		project.timeCreated = parseInt(project.timeCreated, 10);
    project.id = parseInt(project.id, 10);
    project.parentId = parseInt(project.parentId, 10);
    project.privileges = parseInt(project.privileges, 10);
    project.creator = parseInt(project.creator, 10);

		return project;
	});
}

module.exports.toRequest = projectsToRequest;
module.exports.fromRequest = projectsFromRequest;