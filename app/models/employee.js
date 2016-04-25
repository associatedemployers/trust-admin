import DS from 'ember-data';
import addressFormatter from 'trust-admin/utils/address-formatter';
import Ember from 'ember';

const { attr, hasMany, belongsTo } = DS,
      { computed } = Ember;


export default DS.Model.extend({
  // Legacy
  legacyRecordNumber:                  attr('string'),
  legacyCobraTermChoice:               attr('string'),
  legacyPreExistingCondition:          attr('string'),
  legacyCreditableCoverage:            attr('string'),
  legacyRetireeFlag:                   attr('string'),
  legacyAflacFlag:                     attr('string'),
  legacyChangingCompany:               attr('string'),
  legacyChangingLocationInCompany:     attr('string'),
  legacyMarriage:                      attr('string'),
  legacyXNonVolWaivingSpouse:          attr('string'),
  legacyXNonVolWaivingDependents:      attr('string'),
  legacyXNonVolWaiving:                attr('string'),
  legacyXNonVolWaivedSpouseName:       attr('string'),
  legacyXNonVolWaivedDependentName:    attr('string'),
  legacyXVolDentalWaivedSpouseName:    attr('string'),
  legacyXVolDentalWaivedDependentName: attr('string'),
  legacyXVolVisionWaivedSpouseName:    attr('string'),
  legacyXVolVisionWaivedDependentName: attr('string'),

  ebmsNumber:          attr('string'),
  memberId:            attr('string'),
  ebmsTerminationCode: attr('string'),
  waived:              attr('boolean'),
  enrolled:            attr('boolean'),

  firstName:     attr('string'),
  middleInitial: attr('string'),
  lastName:      attr('string'),
  suffix:        attr('string'),

  addressLine1:  attr('string'),
  addressLine2:  attr('string'),
  city:          attr('string'),
  state:         attr('string'),
  zipcode:       attr('string'),
  ssn:           attr('string'),
  gender:        attr('string'),
  maritalStatus: attr('string'),

  // Relational
  dependents:     hasMany('dependent', { async: true }),
  contactMethods: hasMany('contact-method'),
  beneficiaries:  hasMany('beneficiary'),
  notes:          hasMany('note'),
  files:          hasMany('file', { async: true }),
  historyEvents:  hasMany('history-event', { async: true }),
  company:        belongsTo('company', { async: true }),

  // Relational Plans
  medicalPlan:  belongsTo('medical-plan', { async: true }),
  medicalRates: hasMany('medical-rate', { async: true }),
  dentalRates:  hasMany('dental-rate', { async: true }),
  visionRates:  hasMany('vision-rate', { async: true }),
  lifeRates:    hasMany('life-rate', { async: true }),

  medicalPlanCovers: attr('string'),
  dentalPlanCovers:  attr('string'),
  visionPlanCovers:  attr('string'),
  lifePlanCovers:    attr('string'),

  // Computed
  fullName: computed('firstName', 'lastName', 'middleInitial', 'suffix', function () {
    var n = this.getProperties('firstName', 'lastName', 'middleInitial', 'suffix');

    n.middleInitial =  n.middleInitial  ? n.middleInitial + '. ' : '';
    n.suffix        =  n.suffix  ? ' ' + n.suffix : '';

    return n.firstName + ' ' + n.middleInitial + n.lastName + n.suffix;
  }),

  isActive: computed('legacyClientTerminationDate', function () {
    return moment(this.get('legacyClientTerminationDate')).isBefore( moment() );
  }),

  isMarried: computed('maritalStatus', function () {
    return this.get('maritalStatus') === 'married';
  }),

  hasAddress: computed('addressLine1', 'city', 'state', function () {
    return this.get('addressLine1') && this.get('city') && this.get('state');
  }),

  addressFormatted: addressFormatter.property('addressLine1', 'addressLine2', 'city', 'state', 'zipcode'),

  // DTs
  dateOfBirth:                 attr('date'),
  legacyClientEmploymentDate:  attr('date'),
  legacyClientTerminationDate: attr('date'),
  legacyInitialDateSent:       attr('date'),
  legacyChangeSent:            attr('date'),
  legacyTerminationSent:       attr('date'),
  legacyTrapTermination:       attr('date'),
  legacyCobraStartDate:        attr('date'),
  legacyCobraTerminationDate:  attr('date'),

  'time-stamp': attr('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
