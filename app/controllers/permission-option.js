import Ember from 'ember';

export default Ember.ObjectController.extend({
  initDefault: function () {
    this.set('on', true);
  }.on('init')
});
