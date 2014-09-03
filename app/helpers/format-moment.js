import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function ( timeStamp, pattern ) {
  pattern = ( typeof pattern === 'string') ? pattern : "MM/DD/YYYY";
  // Expect Date-Constructed String
  return  moment( timeStamp ).format( pattern );
});
