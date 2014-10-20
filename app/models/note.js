import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  ebms:   attribute('boolean'),
  concat: attribute('boolean'),
  text:   attribute('string'),
  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
