import Ember from 'ember';
import LoadableRouteMixin from 'trust-admin/mixins/loadable-route';
import methodProxy from 'trust-admin/utils/proxy-controller-method';

export default Ember.Route.extend(LoadableRouteMixin, {
  model ( params ) {
    return this.store.find('employee', params.id);
  },

  actions: {
    loadSnapshot: methodProxy('loadSnapshot')
  }
});
