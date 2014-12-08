import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  ebmsNumber:          attribute('string'),
  legacyCompanyNumber: attribute('string'),
  soleProprietorship:  attribute('boolean'),
  embeddedDeductible:  attribute('boolean'),
  legacyInactive:      attribute('boolean'),

  addressLine1: attribute('string'),
  addressLine2: attribute('string'),
  city:         attribute('string'),
  state:        attribute('string'),
  zipcode:      attribute('string'),
  
  phone: attribute('string'),
  fax:   attribute('string'),

  company:   DS.belongsTo('company'),
  employees: DS.hasMany('employee'),

  legacyEffectiveDate: attribute('date'),
  time_stamp:          attribute('date'),
});
