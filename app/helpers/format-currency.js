import Ember from 'ember';

function formatCurrency ( value ) {
  value = parseFloat(value) || 0;
  return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export {
  formatCurrency
};

export default Ember.Handlebars.makeBoundHelper(formatCurrency);
