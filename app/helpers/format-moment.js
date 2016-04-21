import Ember from 'ember';

function formatMoment ( timestamp, pattern ) {
  let _pattern = typeof pattern === 'string' ? pattern : 'MM/DD/YYYY';
  // Expect Date-Constructed String
  return  moment( timestamp ).format( _pattern );
}

export {
  formatMoment
};

export default Ember.Helper.helper(formatMoment);
