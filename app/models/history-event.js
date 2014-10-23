import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  description: attribute('string'),

  // Arrays
  eventFlags:  attribute('array'),
  delta:       attribute('array'),
  deltaTypes:  attribute('array'),

  updatedDocument:  attribute(),
  previousDocument: attribute(),

  documentId: attribute('string'),
  updater:    attribute('string'),

  eventDate:  attribute('date'),
  time_stamp: attribute('date')
});
