import DS from 'ember-data';

const { attr, hasMany } = DS,
      defaultFalse = {
        defaultValue: false
      };

export default DS.Model.extend({
  planNumber:    attr('string'),
  name:          attr('string'),
  coverage:      attr('number'),
  rate:          attr('number'),
  ageGroupStart: attr('number'),
  ageGroupEnd:   attr('number'),

  coversSpouse:     attr('boolean', defaultFalse),
  coversEmployee:   attr('boolean', defaultFalse),
  coversDependents: attr('boolean', defaultFalse),

  // Relational
  companies: hasMany('company', { async: true }),

  // System
  'time-stamp': attr('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
