import Ember from 'ember';
import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  name:        attribute('string'),
  endpoints:   attribute('array', {
    defaultValue: Ember.A()
  }),
  type:        attribute('string'),
  permissions: attribute('array', {
    defaultValue: Ember.A()
  }),

  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
