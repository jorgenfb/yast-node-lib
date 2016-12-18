var types = require('../data/record-types');

/**
* Creates an record of a given record type
*
* @param  {Number} typeId id of the record type to create
* @return {Object} data model of the new record. Model is not save to server yet.
*/
function createType(typeId){
	// Get type
	var type = types[typeId];

  var record = {
    type: typeId,
  };

  // Fill with default values
  type.variableTypes.forEach(function(varType){
    switch(varType.valType){
      case 1: // int, fallthrough
      case 2: // float
        record[varType.name] = 0;
        break;
      case 3: // time
        record[varType.name] = Math.floor(Date.now()/1000);
        break;
      case 4: // string
        record[varType.name] = '';
    }
  });

  return record;
}

module.exports.createType = createType;
