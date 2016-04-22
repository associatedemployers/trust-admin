import DS from 'ember-data';
import Ember from 'ember';
import addressFormatter from 'trust-admin/utils/address-formatter';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  name: attr('string'),

  contactName:  attr('string'),
  contactPhone: attr('string'),
  contactFax:   attr('string'),

  addressLine1: attr('string'),
  addressLine2: attr('string'),
  city:         attr('string'),
  state:        attr('string'),
  zipcode:      attr('string'),

  // Relational
  medicalRates: hasMany('medical-rate', { async: true, inverse: 'company' }),
  employees:    hasMany('employee', { async: true }),
  locations:    hasMany('locations', { async: true }),

  // Legacy Fields and Flags
  legacyCompanyNumber:     attr('string'),
  legacyAemMemberId:       attr('string'),
  legacyBrokerId:          attr('string'),
  legacyRateTier:          attr('string'),
  legacyWaitingPeriod:     attr('string'),
  legacySelectCare:        attr('string'),
  legacyMinimumHours:      attr('string'),
  legacySoleProprietor:    attr('string'),
  legacyRetirees:          attr('string'),
  legacyLoa:               attr('string'),
  legacyContribution:      attr('string'),
  legacyNotes:             attr('string'),
  legacyWebId:             attr('string'),
  legacyWebPassword:       attr('string'),
  legacyWebEmail:          attr('string'),
  legacyAffiliated:        attr('string'),
  legacyCoverLifeIfWaived: attr('string'),
  legacyBrightChoicesFlag: attr('string'),
  legacyMtChamberFlag:     attr('string'),
  legacyWellnessFlag:      attr('string'),
  legacyEffectiveMonth:    attr('string'),
  legacyPrimaryCo:         attr('string'),
  legacyNumberEmployees:   attr('string'),

  legacyCompEffectDate:    attr('date'),
  legacyBrokerEffectDate:  attr('date'),

  // System
  'time-stamp': attr('date', {
    defaultValue: function () {
      return Date();
    }
  }),

  // Computed
  addressFormatted: addressFormatter.property('addressLine1', 'addressLine2', 'city', 'state', 'zipcode')});
