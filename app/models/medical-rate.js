import DS from 'ember-data';
import RateModel from './rate';

var attribute = DS.attr;

export default RateModel.extend({
  ebmsNumber:    attribute('string'),
  planNumber:    attribute('string'),
  legacyNetwork: attribute('string'),
  coInsurance:   attribute('string'),
  deductible:    attribute('number'),
  name:          attribute('string'),

  employee:            attribute('number'),
  employeeAndSpouse:   attribute('number'),
  employeeAndChildren: attribute('number'),
  family:              attribute('number'),

  legacyOldEmployeeRate:                   attribute('string'),
  legacyOldEmployeeAndSpouseRate:          attribute('string'),
  legacyOldEmployeeAndChildrenRate:        attribute('string'),
  legacyOldFamilyRate:                     attribute('string'),
  legacyRateChangeEmployeeRate:            attribute('string'),
  legacyRateChangeEmployeeAndSpouseRate:   attribute('string'),
  legacyRateChangeEmployeeAndChildrenRate: attribute('string'),
  legacyRateChangeFamilyRate:              attribute('string'),

  plan:    DS.belongsTo('medical-plan', { async: true }),
  company: DS.belongsTo('company', { async: true }),

  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  }),

  // Computed
  coInsuranceSplit: function () {
    var a = this.get('coInsurance').split('/');

    return {
      insurance: a[ 0 ],
      employee:  a[ 1 ]
    };
  }.property('coInsurance')
});
