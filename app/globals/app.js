import Ember from 'ember';

export default Ember.Object.extend({
  initialize: function () {
    var self = this;

    return $.getJSON('/api/administration/stats', { models: [ 'Employee', 'Company', 'MedicalRate' ] }).then(function ( res ) {
      self.set('stats', res);
    });
  }
});
