import Ember from 'ember';
import LoadableRouteMixin from '../mixins/loadable-route';

export default Ember.Route.extend(LoadableRouteMixin, {
  model ( params ) {
    return this.store.query('medical-rate', { limit: params.itemsPerPage, page: params.page - 1 });
  }
});
