import Ember from 'ember';

function toString ( value ) {
  return typeof value === 'string' ? value : JSON.stringify( value );
}

export {
  toString
};

export default Ember.Helper.helper(toString);
