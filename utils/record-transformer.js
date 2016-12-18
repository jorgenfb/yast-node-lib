var timeUtils = require('./time-utils');

/**
 * Prepares an array of records to be sent to the server
 *
 * @param  {Array} records collection of records
 * @return {Object} an object ready to be sent to the server ( as the data portion )
 */
function recordsToRequest(records, types){
  return records.map(function(record){

    console.log('Initial record: ');
    console.log(record);


    var type = types[record.type];

    // Extract variables from members
    var variables = [];
    type.variableTypes.forEach(function(varType){
      var value = record[varType.name];

      // Make sure we do not do toString() on null or undefined
      if (value === undefined || value === null){
        value = '';
      }

      switch(varType.valType){
        case 1: // Boolean, needs to be represented by '0' or '1'
          value = value ? '1' : '0';
          break;
        case 3:
          value = parseInt(((value).getTime())/1000)
          break;
        default:
          value = value + '';
      }

      console.log('Variable value ' + varType.name + ' has value ' + value);

      // Simple conversion to string
      variables.push(value);
    });

    console.log('Variables: ');
    console.log(variables);

    // Wrap record
    return {record: {
      id: record.id,
      typeId: record.type,
      project: record.project,
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

    // Change typeId to type
    record.type = record.typeId;
    delete record.typeId;

    record.variables.forEach(function(value, id){
      var type = recordType.variableTypes[id]; // TODO: check if exists

      // TODO: errorhandling
      switch(type.valType){
        case 1:  // Boolean, represented as boolean
          value = Number(value) !== 0;
          break;
        case 2:
          value = Number(value);
          break;
        case 3: // Unix timestamp
          value = Number(value);
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
