import DS from 'ember-data';

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
  historyEvents:  DS.hasMany('history-event', { async: true }),
  company:        DS.belongsTo('company', { async: true }),

  // Relational Plans
  medicalRates:   DS.hasMany('medical-rate'),
  dentalRates:    DS.hasMany('dental-rate'),
  visionRates:    DS.hasMany('vision-rate'),
  lifeRates:      DS.hasMany('life-rate'),

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
