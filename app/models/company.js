import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  name: attribute('string'),

  contactName:  attribute('string'),
  contactPhone: attribute('string'),
  contactFax:   attribute('string'),

  addressLine1: attribute('string'),
  addressLine2: attribute('string'),
  city:         attribute('string'),
  state:        attribute('string'),
  zipcode:      attribute('string'),

  // Relational
  medicalRates: DS.hasMany('medical-rate', { async: true }),
  employees:    DS.hasMany('employee', { async: true }),

  // Legacy Fields and Flags
  legacyCompanyNumber:     attribute('string'),
  legacyAemMemberId:       attribute('string'),
  legacyBrokerId:          attribute('string'),
  legacyRateTier:          attribute('string'),
  legacyCompEffectDate:    attribute('string'),
  legacyBrokerEffectDate:  attribute('string'),
  legacyWaitingPeriod:     attribute('string'),
  legacySelectCare:        attribute('string'),
  legacyMinimumHours:      attribute('string'),
  legacySoleProprietor:    attribute('string'),
  legacyRetirees:          attribute('string'),
  legacyLoa:               attribute('string'),
  legacyContribution:      attribute('string'),
  legacyNotes:             attribute('string'),
  legacyWebId:             attribute('string'),
  legacyWebPassword:       attribute('string'),
  legacyWebEmail:          attribute('string'),
  legacyAffiliated:        attribute('string'),
  legacyCoverLifeIfWaived: attribute('string'),
  legacyBrightChoicesFlag: attribute('string'),
  legacyMtChamberFlag:     attribute('string'),
  legacyWellnessFlag:      attribute('string'),
  legacyEffectiveMonth:    attribute('string'),
  legacyPrimaryCo:         attribute('string'),
  legacyNumberEmployees:   attribute('string'),

  // System
  time_stamp: attribute('string', {
    defaultValue: function () {
      return moment().format("YYYY/MM/DD HH:mm:ss");
    }
  })
});
