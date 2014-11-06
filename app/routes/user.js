import Ember from 'ember';
import LoadableRouteMixin from '../mixins/loadable-route';

export default Ember.Route.extend(LoadableRouteMixin, {
  model: function ( params ) {
    return this.store.find('user', params.id);
  }
});
