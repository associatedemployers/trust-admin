import Ember from 'ember';
import ResourcePaginatorMixin from '../mixins/resource-paginator';
import ResourceFiltersMixin from '../mixins/resource-filters';
import Employee from '../models/employee';

var filters = {
    terminated: false,
    city: '',
    state: null
};

export default Ember.ArrayController.extend(ResourcePaginatorMixin, ResourceFiltersMixin, {
  needs: [ 'application' ],
  states: Ember.computed.alias('controllers.application.states'),
  queryParams: [ 'sort', 'page', 'itemsPerPage', 'serializeFilters.terminated', 'serializeFilters.city', 'serializeFilters.state' ],

  filterMap: {
    city: 'address.city',
    state: 'address.state',
    terminated: 'legacyClientTerminationDate'
  },

  filterValueNormalization: {
    terminated: function ( value ) {
      return ( value === true || value === 'true' ) ? 'exists' : ( value === false || value === 'false' ) ? 'nexists' : undefined;
    }
  },

  filters: {},
  // Filter Defaults
  serializeFilters: $.extend({}, filters),
  filterDefaults:   $.extend({}, filters),

  // Defaults
  sort:         'ASC',
  page:         1,
  itemsPerPage: 10,

  // Settings
  itemsPerPageOptions: [ 10, 20, 40, 60 ],
  resource: Employee,
  modelName: 'Employee',

  _receivedFilterInput: function () {
    this.set('filtersApplied', false);
  }.observes('serializeFilters.city', 'serializeFilters.state', 'serializeFilters.terminated'),

  cities: function () {
    var self = this;

    Ember.$.getJSON('/api/employees/', {
      _distinct: true,
      select:    'address.city'
    }).then(function ( res ) {
      self.set('cities', res);
    });
  }.property()
});
