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
  medicalPlan: ''
};

var hasFirstArrayPlans = function ( value ) {
  if( !this.get('applyingPlans') ) {
    return undefined;
  }

  return value === true || value === 'true' ? 'exists' : value === false || value === 'false' ? 'nexists' : undefined;
};

export default Ember.Controller.extend(ResourcePaginatorMixin, ResourceFiltersMixin, {
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
        return undefined;
      }

      return value === true || value === 'true' ? 'exists' : value === false || value === 'false' ? 'nexists' : undefined;
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

  renderPopover: function () {
    Ember.run.scheduleOnce('afterRender', () => {
      this.$('.trigger-popover').popover({
        html: true,
        container: 'body'
      });
    });
  }.observes('model'),

  cities: function () {
    var self = this;

    Ember.$.getJSON('/api/employees/', {
      _distinct: true,
      select:    'address.city'
    }).then(function ( res ) {
      self.set('cities', res);
    });
  }.property(),

  showingActive: true,
  sortasc: true,

  employees: function () {
    var employees = this.get('content'),
        o = {
          active:     [],
          terminated: []
        },
        sortasc = this.get('sortasc');

    if( !employees ) {
      return o;
    }

    employees.forEach(employee => {
      if( employee.get('legacyClientTerminationDate') ) {
        o.terminated.push( employee );
      } else {
        o.active.push( employee );
      }
    });

    o.active.sort(function ( a, b ) {
      var at = new Date( a.get('legacyClientEmploymentDate') ),
          bt = new Date( b.get('legacyClientEmploymentDate') );

      return sortasc ? bt - at : at - bt;
    });

    o.terminated.sort(function ( a, b ) {
      var at = new Date( a.get('legacyClientTerminationDate') ),
          bt = new Date( b.get('legacyClientTerminationDate') );

      return sortasc ? bt - at : at - bt;
    });

    return o;
  }.property('content.@each', 'sortasc'),

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty( prop );
    },

    show ( c ) {
      var map = {
        active: 'showingActive',
        terminated: 'showingTerminated'
      };

      for ( var key in map ) {
        if ( !map.hasOwnProperty(key) ) {
          continue;
        }

        var s;

        if( c === key ) {
          s = true;
        } else {
          s = false;
        }

        this.set( map[ key ], s );
      }
    }
  }
});
