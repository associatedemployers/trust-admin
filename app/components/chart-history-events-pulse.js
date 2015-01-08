import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'chart-view' ],
  height: '400',
  chartOptions: {
    color: {
      pattern: [ '#B3B3B3' ]
    },
    tooltip: {
      format: {
        title: function ( x ) {
          return moment( x ).format('YYYY-MM-DD');
        }
      }
    }
  },

  dataset: function () {
    var historyEvents = this.get('historyEvents'),
        dataSet = Ember.A([
          [ 'Changes' ],
          [ 'xplot' ]
        ]);

    historyEvents.mapBy('eventDate').map(function ( eventDate ) {
      return ( eventDate && eventDate.toDateString ) ? eventDate.toDateString() : eventDate;
    }).uniq().forEach(function ( eventDateGroup ) {
      var d = new Date( eventDateGroup );

      var deltas = historyEvents.filter(function ( ev ) {
        var eventDate = ev.get('eventDate');
        return ( eventDate && eventDate.toDateString() === eventDateGroup );
      }).reduce(function ( val, ev ) {
        return val + ( ev.get('delta.length') || 0 );
      }, 0);

      if( !isFinite( d ) ) {
        return;
      }

      dataSet[ 0 ].pushObject( deltas );
      dataSet[ 1 ].pushObject( d );
    });

    return dataSet;
  }.property('historyEvents.@each.delta', 'historyEvents.@each.eventDate'),

  _draw: function () {
    Ember.run.next(this, function () {
      var chart = this.get('chart'),
          data  = {
            x: 'xplot',
            columns: this.get('dataset'),
            type: 'spline',
            labels: false
          };

      if ( !chart ) {
        chart = window.c3.generate($.extend({
          bindto: '#' + this.get('elementId'),
          data: data,
          size: {
            height: this.get('height')
          },
          legend: {
            show: false
          },
          axis: {
            x: {
              type: 'timeseries',
              label: {
                text: 'Churn vs. Date',
                position: 'inner-center'
              },
              tick: {
                fit: true
              }
            }
          }
        }, this.get('chartOptions')));
      } else {
        chart.load( data );
      }

      this.set('chart', chart);
    });
  }.observes('dataset.[]').on('didInsertElement'),
});
