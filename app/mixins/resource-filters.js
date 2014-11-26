import Ember from 'ember';

export default Ember.Mixin.create({
  serializeFilters: {},

  applyFilters: function () {
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
            value       = ( valueNormalization && typeof valueNormalization[ key ] === 'function' ) ? valueNormalization[ key ]( valueForKey ) : valueForKey;

        if( value === undefined || value === '' ) {
          return;
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
      this.applyFilters();
    },

    removeFilters: function () {
      this.setProperties({
        filters: {},
        filtersApplied: false
      });
    },

    resetFilters: function () {
      this.set('serializeFilters', this.get('filterDefaults'));
    }
  }
});
