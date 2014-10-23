import Ember from 'ember';

function countArray ( arr ) {
  return ( arr && arr.length ) ? arr.length : 0;
}

export { countArray };

export default Ember.Handlebars.makeBoundHelper(countArray);
