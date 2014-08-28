import Ember from 'ember';

export default Ember.Route.extend({
  model: function ( params ) {
    return this.store.find('employee', { limit: params.itemsPerPage, page: params.page - 1 });
  }
});
