import Ember from 'ember';

export default Ember.Object.extend({
  stats () {
    return Ember.$.getJSON('/api/administration/stats', {
      models: [ 'Employee', 'Company', 'MedicalRate' ]
    });
  }
});
