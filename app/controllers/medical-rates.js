import Ember from 'ember';
import ResourcePaginatorMixin from '../mixins/resource-paginator';
import MedicalRate from '../models/medical-rate';

export default Ember.Controller.extend(ResourcePaginatorMixin, {
  queryParams: [ 'filters', 'sort', 'page', 'itemsPerPage' ],

  // Defaults
  filters:      {},
  sort:         'ASC',
  page:         1,
  itemsPerPage: 10,

  // Settings
  itemsPerPageOptions: [ 10, 20, 40 ],
  resource: MedicalRate,
  modelName: 'MedicalRate'
});
