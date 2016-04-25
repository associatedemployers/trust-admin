import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: [ 'footer-view' ],

  year: computed(function () {
    return new Date().getFullYear();
  })
});
