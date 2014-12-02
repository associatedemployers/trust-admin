import Ember from 'ember';
import LoadableRouteMixin from 'trust-admin/mixins/loadable-route';

export default Ember.Route.extend(LoadableRouteMixin, {
  model: function ( params ) {
    return this.store.find('employee', { limit: params.itemsPerPage, page: params.page - 1 });
  }
});
