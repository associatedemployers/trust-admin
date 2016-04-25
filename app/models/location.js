import DS from 'ember-data';
import addressFormatter from 'trust-admin/utils/address-formatter';

const { attr, hasMany, belongsTo } = DS;

export default DS.Model.extend({
  ebmsNumber:          attr('string'),
  legacyCompanyNumber: attr('string'),
  soleProprietorship:  attr('boolean'),
  embeddedDeductible:  attr('boolean'),
  legacyInactive:      attr('boolean'),

  addressLine1: attr('string'),
  addressLine2: attr('string'),
  city:         attr('string'),
  state:        attr('string'),
  zipcode:      attr('string'),

  phone: attr('string'),
  fax:   attr('string'),

  company:   belongsTo('company'),
  employees: hasMany('employee'),

  legacyEffectiveDate: attr('date'),
  'time-stamp':          attr('date'),

  // Computed
  addressFormatted: addressFormatter.property('addressLine1', 'addressLine2', 'city', 'state', 'zipcode')
});
