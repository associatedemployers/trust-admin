import Ember from 'ember';

export default Ember.Route.extend({
  model ( params ) {
    if( this.session.get('authenticated') ) {
      return this.transitionTo('index');
    }

    return params.id;
  },

  setupController ( controller, model ) {
    this._super( controller, model );
    controller.set('id', model);
  }
});
