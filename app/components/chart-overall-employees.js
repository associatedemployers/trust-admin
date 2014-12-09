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
      Ember.$.getJSON('/api/employees', { waived: false, select: '-_id legacyClientEmploymentDate legacyClientTerminationDate waived', sort: { legacyClientTerminationDate: 1 } }).then(function ( data ) {
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

        for ( var i = 0; i < timePad; i++ ) {
          dataSet[ 0 ].pushObject( loopDate.format('YYYY-MM-DD') );

          loopDate.add(Math.ceil( monthsBetween / timePad ), 'months');
        }

        dataSet[ 0 ].pushObject( currentDate.date( 1 ).format('YYYY-MM-DD') );

        var reduceEmployees = function ( count, employee ) {
          var emp  = ( employee.legacyClientEmploymentDate )  ? moment( employee.legacyClientEmploymentDate )  : null,
              term = ( employee.legacyClientTerminationDate ) ? moment( employee.legacyClientTerminationDate ) : null;

          return ( ( ( emp && emp.isBefore( loopDate ) ) && ( !term || term.isAfter( loopDate ) ) ) || ( !emp && term && term.isAfter( loopDate ) ) ) ? count + 1 : count;
        };

        dataSet[0].slice(1, dataSet[0].length).forEach(function ( date ) {
          if( moment(date, 'YYYY-MM-DD').isAfter(currentDate) ) {
            return;
          }

          loopDate = date;

          dataSet[ 1 ].pushObject( employees.reduce( reduceEmployees, 0 ) );
        });

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
