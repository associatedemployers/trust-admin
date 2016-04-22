import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  user:  belongsTo('user'),
  group: belongsTo('permission-group'),
  groupName: attr('string'),
  name:  attr('string'),
  type:  attr('string'),

  'time-stamp': attr('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
