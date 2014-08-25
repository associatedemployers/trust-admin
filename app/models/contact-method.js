import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  type:  attribute('string'),
  value: attribute('string'),
  ext:   attribute('string')
});
