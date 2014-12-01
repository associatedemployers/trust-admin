import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  token:   attribute('string'),
  expires: attribute('string'), // date support broken in LocalStorage Adapter
  user:    attribute('string')
});
