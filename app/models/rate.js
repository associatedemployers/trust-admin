import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  deductible:          attr('string'),
  planNumber:          attr('string'),
  name:                attr('string'),
  covers:              attr('string'), // Employee-only

  // Actual Rates
  employee:            attr('number'),
  employeeAndSpouse:   attr('number'),
  employeeAndChildren: attr('number'),
  family:              attr('number'),

  // Relational
  companies:           hasMany('company'),

  // System
  'time-stamp': attr('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
