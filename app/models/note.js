import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  ebms:   attr('boolean'),
  concat: attr('boolean'),
  text:   attr('string'),
  'time-stamp': attr('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
