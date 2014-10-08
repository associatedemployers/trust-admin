import Ember from 'ember';

export default Ember.ArrayController.extend({
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

    employees.forEach(function ( employee ) {
      if( employee.get('legacyClientTerminationDate') ) {
        o.terminated.push( employee );
      } else {
        o.active.push( employee );
      }
    });

    o.active.sort(function ( a, b ) {
      var at = new Date( a.get('legacyClientEmploymentDate') ),
          bt = new Date( b.get('legacyClientEmploymentDate') );

      return ( sortasc ) ? bt - at : at - bt;
    });

    o.terminated.sort(function ( a, b ) {
      var at = new Date( a.get('legacyClientTerminationDate') ),
          bt = new Date( b.get('legacyClientTerminationDate') );

      return ( sortasc ) ? bt - at : at - bt;
    });

    return o;
  }.property('content.@each', 'sortasc'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    show: function ( c ) {
      var map = {
        active: 'showingActive',
        terminated: 'showingTerminated'
      };

      for ( var key in map ) {
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
