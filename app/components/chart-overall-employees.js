import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'chart-view' ],

  height: '400',
  chartOptions: {
    zoom: {
      enabled: true
    }
  },

  _getDataset: function () {
    return new Ember.RSVP.Promise(function ( resolve ) {  
      Ember.$.getJSON('/api/employees', { waived: false, select: '-_id legacyClientEmploymentDate legacyClientTerminationDate waived', sort: { legacyClientTerminationDate: -1 } }).then(function ( data ) {
        var employees = Ember.A( data.employee );

        if( !employees || employees.length < 1 ) {
          return employees;
        }

        var currentDate   = moment(),
            startDate     = moment( employees[0].legacyClientEmploymentDate ),
            monthsBetween = Math.abs( startDate.diff( currentDate, 'months' ) ),
            timePad       = ( monthsBetween > 10 ) ? 10 : monthsBetween,
            dataSet       = Ember.A([
              [ 'x' ],
              [ 'Participating Employees' ]
            ]);

        var loopDate = moment( startDate ).date( 1 );

        var checkEmployee = function ( employee ) {
          var emp  = ( employee.legacyClientEmploymentDate )  ? moment( employee.legacyClientEmploymentDate )  : null,
              term = ( employee.legacyClientTerminationDate ) ? moment( employee.legacyClientTerminationDate ) : null;

          if( emp && emp.isBefore( loopDate ) ) {
            if( !term || term.isAfter( loopDate ) ) {
              activeCount++;
            }
          } else if ( !emp && term && term.isAfter( loopDate ) ) {
            activeCount++;
          }
        };

        for ( var i = 0; i < timePad; i++ ) {
          var activeCount = 0;

          if( loopDate.isAfter(currentDate) ) {
            break;
          }

          employees.forEach( checkEmployee );

          dataSet[ 0 ].pushObject( loopDate.format('YYYY-MM-DD') );
          dataSet[ 1 ].pushObject( activeCount );

          loopDate.add(Math.ceil( monthsBetween / timePad ), 'months');
        }

        resolve(dataSet);
      });
    });
  },

  _draw: function () {
    this.set('isLoadingChart', true);
    var self = this;

    this._getDataset().then(function ( dataset ) {
      var chart = self.get('chart'),
          data = {
            x: 'x',
            columns: dataset,
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
            height: self.get('height')
          }
        }, self.get('chartOptions')));
      } else {
        chart.load( data );
      }

      self.set('isLoadingChart', false);

      self.set('chart', chart);
    });
  }.observes('resolution').on('didInsertElement'),

  actions: {
    refocus: function () {
      var chart = this.get('chart');

      if( chart ) {
        chart.unzoom();
      }
    }
  }
});
