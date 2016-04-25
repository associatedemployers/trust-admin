import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  token:   attr('string'),
  expires: attr('string'), // date support broken in LocalStorage Adapter
  user:    attr('string')
});
