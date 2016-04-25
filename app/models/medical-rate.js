import DS from 'ember-data';
import RateModel from './rate';
import Ember from 'ember';

const { attr, belongsTo } = DS,
      { computed } = Ember;

export default RateModel.extend({
  ebmsNumber:    attr('string'),
  planNumber:    attr('string'),
  legacyNetwork: attr('string'),
  coInsurance:   attr('string'),
  deductible:    attr('number'),
  name:          attr('string'),

  employee:            attr('number'),
  employeeAndSpouse:   attr('number'),
  employeeAndChildren: attr('number'),
  family:              attr('number'),

  legacyOldEmployeeRate:                   attr('string'),
  legacyOldEmployeeAndSpouseRate:          attr('string'),
  legacyOldEmployeeAndChildrenRate:        attr('string'),
  legacyOldFamilyRate:                     attr('string'),
  legacyRateChangeEmployeeRate:            attr('string'),
  legacyRateChangeEmployeeAndSpouseRate:   attr('string'),
  legacyRateChangeEmployeeAndChildrenRate: attr('string'),
  legacyRateChangeFamilyRate:              attr('string'),

  plan:    belongsTo('medical-plan', { async: true }),
  company: belongsTo('company', { async: true }),

  'time-stamp': attr('date', {
    defaultValue: function () {
      return new Date();
    }
  }),

  // Computed
  coInsuranceSplit: computed('coInsurance', function () {
    var a = this.get('coInsurance').split('/');

    return {
      insurance: a[ 0 ],
      employee:  a[ 1 ]
    };
  })
});
