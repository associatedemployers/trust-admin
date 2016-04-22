import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  description: attr('string'),

  // Arrays
  eventFlags:  attr('array'),
  delta:       attr('array'),
  deltaTypes:  attr('array'),

  updatedDocument:  attr(),
  previousDocument: attr(),

  documentId: attr('string'),
  updater:    attr('string'),

  eventDate:  attr('date'),
  'time-stamp': attr('date')
});
