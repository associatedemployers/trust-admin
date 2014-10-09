import Ember from 'ember';

function titleCase ( value ) {
  return value.replace(/\w\S*/g, function ( str ) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  });
}

export {
  titleCase
};

export default Ember.Handlebars.makeBoundHelper(titleCase);
