import Ember from 'ember';

var changeMap = {
  N: 'Add',
  D: 'Delete',
  E: 'Edit',
  A: '[Array]Edit'
};

function parseChangeCode ( letterCode ) {
  var opConversion = changeMap[ letterCode ];
  return opConversion || 'Undefined Operation';
}

export {
  parseChangeCode
};

export default Ember.Handlebars.makeBoundHelper(parseChangeCode);
