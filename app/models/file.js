import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  attachments:  DS.hasMany('file', { async: true }),
  notes:        DS.hasMany('note'),
  company:      DS.belongsTo('company', { async: true }),
  employee:     DS.belongsTo('employee', { async: true }),
  historyEvent: DS.belongsTo('historyEvent', { async: true }),
  creator:      DS.belongsTo('user', { async: true }),

  name:                attribute('string'),
  electronicSignature: attribute('string'),
  extension:           attribute('string'),
  labels:              attribute('array'),

  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  }),

  // Computed
  link: function () {
    var plain = this.toJSON(),
        id    = ( plain.employee ) ? plain.employee : ( plain.company ) ? plain.company : null;

    return '/api/file/' + id + '-' + this.get('id') + '.' + plain.extension;
  }.property('extension', 'employee', 'company')
});
