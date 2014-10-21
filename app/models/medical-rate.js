import DS from 'ember-data';
import RateModel from './rate';

// var attribute = DS.attr;

export default RateModel.extend({
  ebmsNumber:    String,
  legacyNetwork: String,

  legacyOldEmployeeRate:                   String,
  legacyOldEmployeeAndSpouseRate:          String,
  legacyOldEmployeeAndChildrenRate:        String,
  legacyOldFamilyRate:                     String,
  legacyRateChangeEmployeeRate:            String,
  legacyRateChangeEmployeeAndSpouseRate:   String,
  legacyRateChangeEmployeeAndChildrenRate: String,
  legacyRateChangeFamilyRate:              String,

  plan: DS.belongsTo('medical-plan', { async: true })
});
