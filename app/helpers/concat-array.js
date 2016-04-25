import Ember from 'ember';

function concatArray ([array, separator]) {
  if( !array || typeof array !== 'object' || !array.length ) {
    return '';
  }

  var arrayLen = array.length,
      _separator = separator || ', ';

  return array.reduce((str, item, index) => {
    return index === arrayLen - 1 ? str + item : str + item + _separator;
  }, '');
}

export {
  concatArray
};

export default Ember.Helper.helper(concatArray);
