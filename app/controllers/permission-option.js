import Ember from 'ember';

export default Ember.Controller.extend({
  initDefault: function () {
    this.set('on', true);
  }.on('init')
});
