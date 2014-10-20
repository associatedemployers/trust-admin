import Ember from 'ember';

export default Ember.ObjectController.extend({
  isPrimary: function () {
    return this.get('content.type') === 'primary';
  }.property('content.type'),
  isContingent: function () {
    return this.get('content.type') === 'contingent';
  }.property('content.type')
});
