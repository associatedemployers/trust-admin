import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'form-group', 'text-center' ],
  theme: 'squish', // default theme

  inputId: function () {
    return 'tglinput-' + this.get('elementId');
  }.property('elementId'),

  toggleClass: function () {
    return 'toggle toggle-' + this.get('theme');
  }.property('theme')
});
