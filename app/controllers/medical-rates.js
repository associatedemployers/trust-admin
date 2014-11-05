import Ember from 'ember';
import ResourcePaginatorMixin from '../mixins/resource-paginator';
import MedicalRate from '../models/medical-rate';

export default Ember.ArrayController.extend(ResourcePaginatorMixin, {
  queryParams: [ 'filters', 'sort', 'page', 'itemsPerPage' ],

  // Defaults
  filters:      {},
  sort:         'ASC',
  page:         1,
  itemsPerPage: 50,

  // Settings
  itemsPerPageOptions: [ 50, 80, 100 ],
  resource: MedicalRate,
  modelName: 'MedicalRate'
});
