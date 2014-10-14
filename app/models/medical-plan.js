import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  name:              attribute('string'),
  legacyKey:         attribute('string'),
  legacyDescription: attribute('string'),
  ebmsIbeCode:       attribute('string'),
  ebmsIbeCode2:      attribute('string'),
  ebmsClmCode:       attribute('string'),
  legacyGrouping:    attribute('string'),
  legacyOrder:       attribute('string'),
  legacyActive:      attribute('string'),

  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
