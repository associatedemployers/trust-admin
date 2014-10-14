import DS from 'ember-data';

var attribute = DS.attr,
    defaultFalse = {
      defaultValue: false
    };

export default DS.Model.extend({
  planNumber:    attribute('string'),
  name:          attribute('string'),
  coverage:      attribute('number'),
  rate:          attribute('number'),
  ageGroupStart: attribute('number'),
  ageGroupEnd:   attribute('number'),

  coversSpouse:     attribute('boolean', defaultFalse),
  coversEmployee:   attribute('boolean', defaultFalse),
  coversDependents: attribute('boolean', defaultFalse),

  // Relational
  companies: DS.hasMany('company', { async: true }),

  // System
  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
