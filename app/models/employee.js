import DS from 'ember-data';
import addressFormatter from 'trust-admin/utils/address-formatter';

var attribute = DS.attr;

export default DS.Model.extend({
  // Legacy
  legacyRecordNumber:                  attribute('string'),
  legacyCobraTermChoice:               attribute('string'),
  legacyPreExistingCondition:          attribute('string'),
  legacyCreditableCoverage:            attribute('string'),
  legacyRetireeFlag:                   attribute('string'),
  legacyAflacFlag:                     attribute('string'),
  legacyChangingCompany:               attribute('string'),
  legacyChangingLocationInCompany:     attribute('string'),
  legacyMarriage:                      attribute('string'),
  legacyXNonVolWaivingSpouse:          attribute('string'),
  legacyXNonVolWaivingDependents:      attribute('string'),
  legacyXNonVolWaiving:                attribute('string'),
  legacyXNonVolWaivedSpouseName:       attribute('string'),
  legacyXNonVolWaivedDependentName:    attribute('string'),
  legacyXVolDentalWaivedSpouseName:    attribute('string'),
  legacyXVolDentalWaivedDependentName: attribute('string'),
  legacyXVolVisionWaivedSpouseName:    attribute('string'),
  legacyXVolVisionWaivedDependentName: attribute('string'),

  ebmsNumber:          attribute('string'),
  memberId:            attribute('string'),
  ebmsTerminationCode: attribute('string'),
  waived:              attribute('boolean'),

  firstName:     attribute('string'),
  middleInitial: attribute('string'),
  lastName:      attribute('string'),
  suffix:        attribute('string'),

  addressLine1:  attribute('string'),
  addressLine2:  attribute('string'),
  city:          attribute('string'),
  state:         attribute('string'),
  zipcode:       attribute('string'),
  ssn:           attribute('string'),
  gender:        attribute('string'),
  maritalStatus: attribute('string'),

  // Relational
  dependents:     DS.hasMany('dependent', { async: true }),
  contactMethods: DS.hasMany('contact-method'),
  beneficiaries:  DS.hasMany('beneficiary'),
  notes:          DS.hasMany('note'),
  files:          DS.hasMany('file', { async: true }),
  historyEvents:  DS.hasMany('history-event', { async: true }),
  company:        DS.belongsTo('company', { async: true }),

  // Relational Plans
  medicalPlan:  DS.belongsTo('medical-plan', { async: true }),
  medicalRates: DS.hasMany('medical-rate', { async: true }),
  dentalRates:  DS.hasMany('dental-rate', { async: true }),
  visionRates:  DS.hasMany('vision-rate', { async: true }),
  lifeRates:    DS.hasMany('life-rate', { async: true }),

  medicalPlanCovers: attribute('string'),
  dentalPlanCovers:  attribute('string'),
  visionPlanCovers:  attribute('string'),
  lifePlanCovers:    attribute('string'),

  // Computed
  fullName: function () {
    var n = this.getProperties('firstName', 'lastName', 'middleInitial', 'suffix');

    n.middleInitial = ( n.middleInitial ) ? n.middleInitial + '. ' : '';
    n.suffix        = ( n.suffix ) ? ' ' + n.suffix : '';

    return n.firstName + ' ' + n.middleInitial + n.lastName + n.suffix;
  }.property('firstName', 'lastName', 'middleInitial', 'suffix'),

  isActive: function () {
    return moment(this.get('legacyClientTerminationDate')).isBefore( moment() );
  }.property('legacyClientTerminationDate'),

  isMarried: function () {
    return this.get('maritalStatus') === 'married';
  }.property('maritalStatus'),

  hasAddress: function () {
    return this.get('addressLine1') && this.get('city') && this.get('state');
  }.property('addressLine1', 'city', 'state'),

  addressFormatted: addressFormatter.property('addressLine1', 'addressLine2', 'city', 'state', 'zipcode'),

  // DTs
  dateOfBirth:                 attribute('date'),
  legacyClientEmploymentDate:  attribute('date'),
  legacyClientTerminationDate: attribute('date'),
  legacyInitialDateSent:       attribute('date'),
  legacyChangeSent:            attribute('date'),
  legacyTerminationSent:       attribute('date'),
  legacyTrapTermination:       attribute('date'),
  legacyCobraStartDate:        attribute('date'),
  legacyCobraTerminationDate:  attribute('date'),

  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
