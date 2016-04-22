import DS from 'ember-data';
import Ember from 'ember';

const { attr, belongsTo, hasMany } = DS,
      { computed } = Ember;

export default DS.Model.extend({
  attachments:  hasMany('file', { async: true }),
  notes:        hasMany('note'),
  company:      belongsTo('company', { async: true }),
  employee:     belongsTo('employee', { async: true }),
  historyEvent: belongsTo('historyEvent', { async: true }),
  creator:      belongsTo('user', { async: true }),

  name:                attr('string'),
  electronicSignature: attr('string'),
  extension:           attr('string'),
  labels:              attr('array'),

  'time-stamp': attr('date', {
    defaultValue: function () {
      return new Date();
    }
  }),

  // Computed
  link: computed('extension', 'employee', 'company', function () {
    var plain = this.toJSON(),
        id    = plain.employee ? plain.employee : plain.company ? plain.company : null;

    return '/api/file/' + id + '-' + this.get('id') + '.' + plain.extension;
  })
});
