var timeUtils = require('./time-utils');

/**
 * Prepares an array of records to be sent to the server
 *
 * @param  {Array} records collection of records
 * @return {Object} an object ready to be sent to the server ( as the data portion )
 */
function recordsToRequest(records, types){
  return records.map(function(record){

    var type = types[record.typeId];

    // Extract variables from members
    var variables = [];
    type.variableTypes.forEach(function(varType){
      if (varType.valType === 3){

        // This is a date. Convert to unix time
        variables.push(timeUtils.toUnix(record[varType.name]) + '');

      } else {
        var v = record[varType.name];

        if (v === undefined || v === null){
          v = '';
        }

        // Simple conversion to string
        variables.push(v + '');
      }
    });

    // Wrap record
    return {record: {
      id: record.id,
      typeId: record.typeId,
      project: record.projectId,
      variables: variables,
    }};
  });
}

/**
 * Transforms records from a request into proper data models
 *
 * @param  {Object} data response from server
 * @param  {Object} types map of available record types
 * @return {Array} array of records
 */
function recordsFromRequest(records, types){
  return records.map(function(wrapper){
    // Unwrap
    var record = wrapper.record;

    // Find type
    var recordType = types[record.typeId]; // TODO: check if exists

    record.variables.forEach(function(value, id){
      var type = recordType.variableTypes[id]; // TODO: check if exists

      // TODO: errorhandling
      switch(type.valType){
        case 1:  // fallthrough
        case 2:
          value = Number(value);
          break;
        case 3:
          value = timeUtils.fromUnix(value);
          break;
      }

      record[type.name] = value;
    });

    // Remove variables array
    delete record.variables;

    return record;
  });
}

module.exports.toRequest = recordsToRequest;
module.exports.fromRequest = recordsFromRequest;