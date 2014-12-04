import Ember from 'ember';
import ResourcePaginatorMixin from 'trust-admin/mixins/resource-paginator';
import ResourceFiltersMixin from 'trust-admin/mixins/resource-filters';
import Company from 'trust-admin/models/company';

var filters = {
  city:         '',
  state:        null,
  minEmployees: null,
  maxEmployees: null
};

export default Ember.ArrayController.extend(ResourcePaginatorMixin, ResourceFiltersMixin, {
  needs: [ 'application' ],
  states: Ember.computed.alias('controllers.application.states'),
  queryParams: [
    'sort',
    'page',
    'itemsPerPage',
    'serializeFilters.city',
    'serializeFilters.state',
    'serializeFilters.minEmployees',
    'serializeFilters.maxEmployees'
  ],

  filterMap: {
    city:  'address.city',
    state: 'address.state'
  },

  filterValueNormalization: {
    minEmployees: function ( value ) {
      if( !value ) {
        return null;
      }

      var absVal = Math.abs( value ) - 1;

      return {
        newKey: 'employees.' + absVal,
        value: 'exists'
      };
    },

    maxEmployees: function ( value ) {
      if( !value ) {
        return null;
      }

      var absVal = Math.abs( value );

      return {
        newKey: 'employees.' + absVal,
        value: 'nexists'
      };
    }
  },

  // Filter Defaults
  serializeFilters: $.extend({}, filters),
  filterDefaults:   $.extend({}, filters),

  // Defaults
  sort:         'ASC',
  page:         1,
  itemsPerPage: 10,

  // Settings
  itemsPerPageOptions: [ 10, 20, 40, 60 ],
  resource: Company,
  modelName: 'Company',

  _receivedFilterInput: function () {
    this.set('filtersApplied', false);
  }.observes(
    'serializeFilters.city',
    'serializeFilters.state',
    'serializeFilters.minEmployees',
    'serializeFilters.maxEmployees'
  ),

  cities: function () {
    var self = this;

    Ember.$.getJSON('/api/companies/', {
      _distinct: true,
      select:    'address.city'
    }).then(function ( res ) {
      self.set('cities', res);
    });
  }.property(),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
