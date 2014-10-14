import Ember from 'ember';

function formatMoment ( timestamp, pattern ) {
  pattern = ( typeof pattern === 'string') ? pattern : "MM/DD/YYYY";
  // Expect Date-Constructed String
  return  moment( timestamp ).format( pattern );
}

export {
  formatMoment
};

export default Ember.Handlebars.makeBoundHelper(formatMoment);
