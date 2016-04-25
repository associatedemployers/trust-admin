import Ember from 'ember';
import LoadableRouteMixin from '../mixins/loadable-route';

export default Ember.Route.extend(LoadableRouteMixin, {
  model ( params ) {
    return this.store.find('medical-rate', params.id);
  }
});
