import Ember from 'ember';
import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name:        attr('string'),
  endpoints:   attr('array', {
    defaultValue: Ember.A()
  }),
  type:        attr('string'),
  permissions: attr('array', {
    defaultValue: Ember.A()
  }),

  'time-stamp': attr('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
