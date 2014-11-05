import Ember from 'ember';
import LoadableRouteMixin from '../mixins/loadable-route';

export default Ember.Route.extend(LoadableRouteMixin, {
  model: function ( params ) {
    return this.store.find('medical-rate', { limit: params.itemsPerPage, page: params.page - 1 });
  }
});
