import Ember from 'ember';
import LoadableRouteMixin from 'trust-admin/mixins/loadable-route';

export default Ember.Route.extend(LoadableRouteMixin, {
  model ( params ) {
    return this.store.find('medical-plan', params.id);
  }
});
