import Ember from 'ember';
import ResourcePaginatorMixin from '../../mixins/resource-paginator';
import User from '../../models/user';

export default Ember.ArrayController.extend(ResourcePaginatorMixin, {
  queryParams: [ 'sort', 'page', 'itemsPerPage' ],

  // Defaults
  sort:         'ASC',
  page:         1,
  itemsPerPage: 10,

  // Settings
  itemsPerPageOptions: [ 10, 20 ],
  resource: User,
  modelName: 'User'
});
