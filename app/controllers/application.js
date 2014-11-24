import Ember from 'ember';

export default Ember.Controller.extend({
  style: null,

  viewClass: function () {
    var routeName = this.get('currentRouteName');

    return ( routeName ) ? routeName + '-view' : 'no-view';
  }.property('currentRouteName'),

  calcStyle: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.set('style', 'min-height: ' + ( window.innerHeight - ( $('.footer-view').height() + $('nav.navbar').height() + 30 ) ) + 'px');
    });
  }.on('init')
});
