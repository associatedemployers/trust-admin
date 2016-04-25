import DS from 'ember-data';
import Ember from 'ember';

const { attr, hasMany } = DS,
      { computed } = Ember;

export default DS.Model.extend({
  firstName:     attr('string'),
  lastName:      attr('string'),
  email:         attr('string'),
  password:      attr('string'),
  type:          attr('string'),
  super:         attr('boolean'),
  receiveEmails: attr('boolean'),
  apiAccess:     attr('boolean'),
  permissions:   hasMany('user-permission', { async: true }),

  fullName: computed('firstName', 'lastName', function () {
    return this.get('firstName') + ' ' + this.get('lastName');
  }),

  'time-stamp': attr('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
