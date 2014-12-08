import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function ( transition ) {
    if(!this.get('session.authenticated')) {
      this.controllerFor('login').setProperties({
        savedTransition: transition
      });

      return this.transitionTo('login');
    }
  }.observes('currentPath'),

  authenticationChanged: function () {
    console.log('auth changed on route');
    console.log(this.session.get('authenticated'));
    if(!this.session.get('authenticated')) {
      this.transitionTo('login');
    }
  }.observes('this.session.authenticated'),
});
