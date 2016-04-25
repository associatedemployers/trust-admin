import Ember from 'ember';
import { states } from '../utils/defined-data';

export default Ember.Controller.extend({
  style: null,
  states: states,

  viewClass: function () {
    var routeName = this.get('currentRouteName');

    return routeName ? routeName.replace(/\./g, '-') + '-view' : 'no-view';
  }.property('currentRouteName'),

  // calcStyle: function () {
  //   Ember.run.scheduleOnce('afterRender', this, function () {
  //     this.set('style', 'min-height: ' + ( window.innerHeight - ( $('.footer-view').height() + $('nav.navbar').height() + 30 ) ) + 'px');
  //   });
  // }.on('init'),

  actions: {
    logout: function () {
      this.session.logout();
      this.transitionToRoute('index');
    }
  }
});
