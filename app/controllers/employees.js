import Ember from 'ember';
import ResourcePaginatorMixin from '../mixins/resource-paginator';
import Employee from '../models/employee';

export default Ember.ArrayController.extend(ResourcePaginatorMixin, {
  queryParams: [ 'filters', 'sort', 'page', 'itemsPerPage' ],

  // Defaults
  filters:      {},
  sort:         'ASC',
  page:         1,
  itemsPerPage: 20,

  // Settings
  itemsPerPageOptions: [ 20, 40, 60, 80, 100 ],
  resource: Employee,
  modelName: 'Employee'
});
