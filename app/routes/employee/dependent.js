import Ember from 'ember';

export default Ember.Route.extend({
  model ( params ) {
    return this.modelFor('employee').get('dependents').findBy('id', params.dependentid);
  }
});
