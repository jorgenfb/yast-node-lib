var errors = {
  // Generic errors
  '0': 'Success',
  '1': 'Unknown error',
  '3': 'Access denied',
  '4': 'Not logged in',
  '5': 'Login failure',
  '6': 'Invalid input',
  '7': 'Subscription required',
  '8': 'Data format error',
  '9': 'No request',
  '10': 'Invalid request',
  '11': 'Missing field',
  '12': 'Request too large',
  '13': 'Server maintenance',

  // Specific errors
  '100' : 'Tried to add duplicate item',
  '101' : 'Tried to modify/delete element without sufficient privileges',
  '200' : 'Unknown recordType id. See record for valid ids',
  '201' : 'Unknown project',
  '202' : 'Unknown folder',
  '203' : 'Unknown record',
  '204' : 'Project/folder hierarchy loop',
  '205' : 'Variables don\'t match recordType id. See record for valid variables',
  '300' : 'Unknown setting',
  '301' : 'Invalid setting value',
  '800' : 'Password invalid format (too long, short or invalid characters)',
  '801' : 'Unknown report format',
  '802' : 'Unknown report group by value'
};

module.exports = errors;