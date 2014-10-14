import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  deductible:          attribute('string'),
  planNumber:          attribute('string'),
  name:                attribute('string'),
  covers:              attribute('string'), // Employee-only

  // Actual Rates
  employee:            attribute('number'),
  employeeAndSpouse:   attribute('number'),
  employeeAndChildren: attribute('number'),
  family:              attribute('number'),

  // Relational
  companies:           DS.hasMany('company'),

  // System
  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
