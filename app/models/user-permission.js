import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  user:  DS.belongsTo('user'),
  group: DS.belongsTo('permission-group'),
  name:  attribute('string'),
  type:  attribute('string'),

  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
