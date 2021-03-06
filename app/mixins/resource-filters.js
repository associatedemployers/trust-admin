import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: [ 'filtersApplied' ],
  filtersApplied: false,
  filters: {},

  init: function () {
    this._super.apply( this, arguments );

    Ember.run.scheduleOnce('afterRender', this, function () {
      if( window.location.search.indexOf('serializeFilters') > -1 || this.get('filtersApplied') ) {
        this._applyFilters();
      }
    });
  },

  _applyFilters: function () {
    var f                  = {},
        filterMap          = this.get('filterMap'),
        valueNormalization = this.get('filterValueNormalization'),
        serializeFilters   = this.get('serializeFilters');

    if( !serializeFilters || Ember.empty( serializeFilters ) ) {
      return this.set('filters', f);
    }

    for ( var key in serializeFilters ) {
      if( serializeFilters.hasOwnProperty( key ) ) {
        var nkey        = ( filterMap && filterMap[ key ] ) ? filterMap[ key ] : key,
            valueForKey = serializeFilters[ key ],
            value       = ( valueNormalization && typeof valueNormalization[ key ] === 'function' ) ? valueNormalization[ key ].call( this, valueForKey ) : valueForKey;

        console.log('got', value, 'for', key);

        if( Ember.empty( value ) ) {
          continue;
        }

        if( typeof value === 'object' && value.newKey ) {
          nkey  = value.newKey;
          value = value.value;
        }

        f[ nkey ] = value;
      }
    }

    this.setProperties({
      filters:        f,
      filtersApplied: true
    });
  },

  actions: {
    applyFilters: function () {
      this._applyFilters();
    },

    removeFilters: function () {
      this.setProperties({
        filters: {},
        filtersApplied: false
      });
    },

    resetFilters: function () {
      var filtersApplied = this.get('filtersApplied');
      this.set('serializeFilters', $.extend({}, this.get('filterDefaults')));

      // Preserve filtersApplied UI state
      if( filtersApplied ) {
        this._applyFilters();
      }
    }
  }
});
