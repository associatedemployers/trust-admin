import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  firstName:     attribute('string'),
  lastName:      attribute('string'),
  email:         attribute('string'),
  password:      attribute('string'),
  type:          attribute('string'),
  super:         attribute('boolean'),
  receiveEmails: attribute('boolean'),
  apiAccess:     attribute('boolean'),
  permissions:   DS.hasMany('permission-group'),

  fullName: function () {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
