import Ember from 'ember';

function concatArray ( array, separator ) {
  if( !array || typeof array !== 'object' || !array.length ) {
    return '';
  }

  var arrayLen = array.length;

  separator = separator || ', ';

  return array.reduce(function ( str, item, index ) {
    return ( index === arrayLen - 1 ) ? str + item : str + item + separator;
  }, '');
}

export {
  concatArray
};

export default Ember.Handlebars.makeBoundHelper(concatArray);
