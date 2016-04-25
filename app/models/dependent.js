import DS from 'ember-data';
import Ember from 'ember';

const { attr, hasMany, belongsTo } = DS,
      { computed } = Ember;

export default DS.Model.extend({
  firstName:     attr('string'),
  middleInitial: attr('string'),
  lastName:      attr('string'),
  suffix:        attr('string'),

  // Info
  relationship:          attr('string'),
  ssn:                   attr('string'),
  gender:                attr('string'),
  ebmsTerminationCode:   attr('string'),
  otherInsuranceCompany: attr('string'), // Dependent's Other Health Insurance Company
  memberId:              attr('string'),
  legacyId:              attr('string'),

  // Legacy Fields
  legacyPreExistingLength:          attr('number'),  // Pre-existing condition length
  legacyPreExistingCertificate:     attr('boolean'), // Pre-existing condition cert.
  legacyPreviousMedical:            attr('boolean'), // Medical coverage previous to term date
  legacyMedicalEnrollment:          attr('boolean'),
  legacyVoluntaryEnrollment:        attr('boolean'),
  legacySupplementalLifeEnrollment: attr('boolean'),
  legacyOtherHealthInsurance:       attr('boolean'),
  legacyHasPaperwork:               attr('boolean'),

  // DTs
  legacyEffectiveDate:   attr('date'),
  legacyTerminationDate: attr('date'),
  legacyInitialDateSent: attr('date'),
  legacyChangeSent:      attr('date'),
  legacyTerminationSent: attr('date'),
  dateOfBirth:           attr('date'),

  // Relational
  notes:          hasMany('note'),
  historyEvents:  hasMany('history-event', { async: true }),
  employee:       belongsTo('employee', { async: true }),

  // Relational Plans
  medicalRates:   hasMany('medical-rate'),
  dentalRates:    hasMany('dental-rate'),
  visionRates:    hasMany('vision-rate'),
  lifeRates:      hasMany('life-rate'),

  // Computed
  fullName: computed('firstName', 'lastName', 'middleInitial', 'suffix', function () {
    var n = this.getProperties('firstName', 'lastName', 'middleInitial', 'suffix');

    n.middleInitial = n.middleInitial ? n.middleInitial + '. ' : '';
    n.suffix        = n.suffix ? ' ' + n.suffix : '';

    return n.firstName + ' ' + n.middleInitial + n.lastName + n.suffix;
  }),

  'time-stamp': attr('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
