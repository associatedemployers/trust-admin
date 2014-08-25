import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  type:     attribute('string'),
  name:     attribute('string'),
  relation: attribute('string'),
  split:    attribute('number')
});
