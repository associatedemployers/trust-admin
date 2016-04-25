import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  type:     attr('string'),
  name:     attr('string'),
  relation: attr('string'),
  split:    attr('number')
});
