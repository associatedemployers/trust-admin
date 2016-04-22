import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  type:  attr('string'),
  value: attr('string'),
  ext:   attr('string')
});
