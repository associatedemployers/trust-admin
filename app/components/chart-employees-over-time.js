import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'chart-view' ],

  height: '400',
  chartOptions: {
    zoom: {
      enabled: true
    }
  },

  dataset: function () {
    var company = this.get('company'),
        employees = this.get('employees');

    if( !company || !employees ) {
      return Ember.A();
    }

    var currentDate   = moment(),
        startDate     = moment( company.get('legacyCompEffectDate') ),
        monthsBetween = Math.abs( startDate.diff( currentDate, 'months' ) ),
        timePad       = ( monthsBetween > 100 ) ? 100 : monthsBetween,
        dataSet       = Ember.A([
          [ 'x' ],
          [ 'Participating Employees' ],
          [ 'Terminated Employees' ]
        ]);

    var loopDate = moment( startDate ).date( 1 );

    var checkEmployee = function ( employee ) {
      var emp  = ( employee.get('legacyClientEmploymentDate') )  ? moment( employee.get('legacyClientEmploymentDate') )  : null,
          term = ( employee.get('legacyClientTerminationDate') ) ? moment( employee.get('legacyClientTerminationDate') ) : null;

      if( term && term.isBefore( loopDate ) ) {
        return terminatedCount++;
      }

      if( !employee || employee.get('waived') === true ) {
        return;
      }

      if( emp && emp.isBefore( loopDate ) ) {
        if( !term || term.isAfter( loopDate ) ) {
          activeCount++;
        }
      } else if ( !emp && term && term.isAfter( loopDate ) ) {
        activeCount++;
      }
    };

    for ( var i = 0; i < timePad; i++ ) {
      var activeCount     = 0,
          terminatedCount = 0;

      if( loopDate.isAfter(currentDate) ) {
        break;
      }

      employees.forEach( checkEmployee );

      dataSet[ 0 ].pushObject( loopDate.format('YYYY-MM-DD') );
      dataSet[ 1 ].pushObject( activeCount );
      dataSet[ 2 ].pushObject( terminatedCount );

      loopDate.add(Math.ceil( monthsBetween / timePad ), 'months');
    }

    return dataSet;
  }.property('employees.@each.legacyClientEmploymentDate', 'company'),

  _draw: function () {
    Ember.run.next(this, function () {
      var chart = this.get('chart'),
          data  = {
            x: 'x',
            columns: this.get('dataset'),
            labels: false
          };

      if( !chart ) {
        chart = window.c3.generate($.extend({
          bindto: '#employees-over-time-chart',
          data: data,
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%Y-%m-%d'
              }
            }
          },
          size: {
            height: this.get('height')
          }
        }, this.get('chartOptions')));
      } else {
        chart.load( data );
      }

      this.set('chart', chart);
    });
  }.observes('dataset.@each').on('didInsertElement'),

  actions: {
    refocus: function () {
      var chart = this.get('chart');

      if( chart ) {
        chart.unzoom();
      }
    }
  }
});
