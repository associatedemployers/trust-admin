import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name:              attr('string'),
  legacyKey:         attr('string'),
  legacyDescription: attr('string'),
  ebmsIbeCode:       attr('string'),
  ebmsIbeCode2:      attr('string'),
  ebmsClmCode:       attr('string'),
  legacyGrouping:    attr('string'),
  legacyOrder:       attr('string'),
  legacyActive:      attr('string'),

  'time-stamp': attr('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
