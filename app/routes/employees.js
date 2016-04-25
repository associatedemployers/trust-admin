import Ember from 'ember';
import LoadableRouteMixin from 'trust-admin/mixins/loadable-route';

export default Ember.Route.extend(LoadableRouteMixin, {
  model ( params ) {
    var query = {
      limit: params.itemsPerPage, page: params.page - 1
    };

    if( params.filtersApplied && this.get('controller') && typeof this.get('controller.filters') === 'object' ) {
      $.extend(query, this.get('controller.filters'));
    }

    return this.store.query('employee', query);
  }
});
