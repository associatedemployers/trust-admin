import Ember from 'ember';

export default Ember.Controller.extend({
  viewClass: function () {
    var routeName = this.get('currentRouteName');

    return ( routeName ) ? routeName + '-view' : 'no-view';
  }.property('currentRouteName')
});
