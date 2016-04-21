import Ember from 'ember';

function formatCurrency ( value ) {
  let _value = parseFloat(value) || 0;
  return '$' + _value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export {
  formatCurrency
};

export default Ember.Helper.helper(formatCurrency);
