import Ember from 'ember';
import ResourcePaginatorMixin from '../mixins/resource-paginator';
import ResourceFiltersMixin from '../mixins/resource-filters';
import Employee from '../models/employee';

var filters = {
  terminated:  false,
  city:        '',
  state:       null,
  hasMedical:  true,
  hasDental:   true,
  hasVision:   true,
  hasLife:     true,
  company:     '',
  medicalPlan: '',
};

var hasFirstArrayPlans = function ( value ) {
  if( !this.get('applyingPlans') ) {
    return;
  }

  return ( value === true || value === 'true' ) ? 'exists' : ( value === false || value === 'false' ) ? 'nexists' : undefined;
};

export default Ember.ArrayController.extend(ResourcePaginatorMixin, ResourceFiltersMixin, {
  needs: [ 'application' ],
  states: Ember.computed.alias('controllers.application.states'),
  queryParams: [
    'sort',
    'page',
    'itemsPerPage',
    'serializeFilters.terminated',
    'serializeFilters.city',
    'serializeFilters.state',
    'serializeFilters.hasMedical',
    'serializeFilters.hasDental',
    'serializeFilters.hasVision',
    'serializeFilters.hasLife',
    'serializeFilters.company',
    'serializeFilters.medicalPlan',
    'applyingMeta',
    'applyingPlans'
  ],

  filterMap: {
    city:       'address.city',
    state:      'address.state',
    terminated: 'legacyClientTerminationDate',
    hasMedical: 'plans.medical.0',
    hasDental:  'plans.dental.0',
    hasVision:  'plans.vision.0',
    hasLife:    'plans.life.0'
  },

  filterValueNormalization: {
    terminated: function ( value ) {
      if( !this.get('applyingMeta') ) {
        return;
      }

      return ( value === true || value === 'true' ) ? 'exists' : ( value === false || value === 'false' ) ? 'nexists' : undefined;
    },
    hasMedical: hasFirstArrayPlans,
    hasDental:  hasFirstArrayPlans,
    hasVision:  hasFirstArrayPlans,
    hasLife:    hasFirstArrayPlans
  },

  // Filter Defaults
  serializeFilters: $.extend({}, filters),
  filterDefaults:   $.extend({}, filters),
  applyingMeta:     false,
  applyingPlans:    false,

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
  }.observes(
    'serializeFilters.city',
    'serializeFilters.state',
    'serializeFilters.terminated',
    'serializeFilters.hasMedical',
    'serializeFilters.hasDental',
    'serializeFilters.hasVision',
    'serializeFilters.hasLife',
    'serializeFilters.company',
    'serializeFilters.medicalPlan',
    'applyingMeta',
    'applyingPlans'
  ),

  cities: function () {
    var self = this;

    Ember.$.getJSON('/api/employees/', {
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
