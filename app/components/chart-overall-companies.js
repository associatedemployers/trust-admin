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
      Ember.$.getJSON('/api/companies', { select: '-_id time_stamp removedOn', sort: { time_stamp: 1 } }).then(function ( data ) {
        var companies = Ember.A( data.company );

        if( !companies || companies.length < 1 ) {
          return companies;
        }

        var currentDate   = moment(),
            startDate     = moment( companies[0].time_stamp ),
            monthsBetween = Math.abs( startDate.diff( currentDate, 'months' ) ),
            timePad       = ( monthsBetween > 10 ) ? 10 : monthsBetween,
            dataSet       = Ember.A([
              [ 'x' ],
              [ 'Active Companies' ]
            ]);

        var loopDate = moment( startDate ).date( 1 );

        for ( var i = 0; i < timePad; i++ ) {
          dataSet[ 0 ].pushObject( loopDate.format('YYYY-MM-DD') );

          loopDate.add(Math.ceil( monthsBetween / timePad ), 'months');
        }

        dataSet[ 0 ].pushObject( currentDate.date( 1 ).format('YYYY-MM-DD') );

        var reduceCompanies = function ( count, company ) {
          var creation = ( company.time_stamp ) ? moment( company.time_stamp ) : null,
              removal  = ( company.removedOn ) ? moment( company.removedOn ) : null;

          return ( ( ( creation && creation.isBefore( loopDate ) ) && ( !removal || removal.isAfter( loopDate ) ) ) || ( !creation && removal && removal.isAfter( loopDate ) ) ) ? count + 1 : count;
        };

        dataSet[0].slice(1, dataSet[0].length).forEach(function ( date ) {
          if( moment(date, 'YYYY-MM-DD').isAfter(currentDate) ) {
            return;
          }

          loopDate = date;

          dataSet[ 1 ].pushObject( companies.reduce( reduceCompanies, 0 ) );
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
          bindto: '#companies-over-time-chart',
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
