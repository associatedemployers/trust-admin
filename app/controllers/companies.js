import Ember from 'ember';
import ResourcePaginatorMixin from 'trust-admin/mixins/resource-paginator';
import ResourceFiltersMixin from 'trust-admin/mixins/resource-filters';
import Company from 'trust-admin/models/company';


export default Ember.ArrayController.extend(ResourcePaginatorMixin, ResourceFiltersMixin, {
  needs: [ 'application' ],
  states: Ember.computed.alias('controllers.application.states'),
  queryParams: [
    'sort',
    'page',
    'itemsPerPage'
  ],

  // Defaults
  sort:         'ASC',
  page:         1,
  itemsPerPage: 10,

  // Settings
  itemsPerPageOptions: [ 10, 20, 40, 60 ],
  resource: Company,
  modelName: 'Company',

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
