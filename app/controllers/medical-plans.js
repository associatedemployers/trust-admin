import Ember from 'ember';
import ResourcePaginatorMixin from '../mixins/resource-paginator';
import MedicalPlan from '../models/medical-plan';

export default Ember.Controller.extend(ResourcePaginatorMixin, {
  queryParams: [ 'filters', 'sort', 'page', 'itemsPerPage' ],

  // Defaults
  filters:      {},
  sort:         'ASC',
  page:         1,
  itemsPerPage: 30,

  // Settings
  itemsPerPageOptions: [ 10, 30, 60 ],
  resource: MedicalPlan,
  modelName: 'MedicalPlan'
});
