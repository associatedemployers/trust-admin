import Ember from 'ember';
import ResourcePaginatorMixin from '../mixins/resource-paginator';

export default Ember.Controller.extend(ResourcePaginatorMixin, {
  queryParams: [ 'filters', 'sort', 'page', 'itemsPerPage' ],

  // Defaults
  filters:      [],
  sort:         'ASC',
  page:         1,
  itemsPerPage: 20,

  // Settings
  maxItems: Ember.computed.alias('globals.stats.Employee'),
  itemsPerPageOptions: [ 20, 40, 60, 80, 100 ],
  modelName: 'Employee'
});
