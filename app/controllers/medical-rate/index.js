import Ember from 'ember';

export default Ember.Controller.extend({
  // Rate Chart
  rateChart: {
    chartOptions: {
      axis: {
        x: {
          type:       'category',
          categories: []
        }
      },
      legend: {
        show: false
      }
    },
    dataOptions: {
      type:   'bar',
      labels: {
        format: function ( v ) {
          return '$' + v.toFixed(2);
        }
      }
    }
  },

  rateDataset: function () {
    var dataset = Ember.A([
      [ 'Rate' ]
    ]);

    var rates      = this.get('content').getProperties('employee', 'employeeAndSpouse', 'employeeAndChildren', 'family'),
        categories = this.get('rateChart.chartOptions.axis.x.categories');

    for ( var k in rates ) {
      var decamelized = Ember.String.decamelize( k ).replace(/_/g, ' ');

      categories.push( Ember.String.capitalize( decamelized ) );
      dataset[ 0 ].push( rates[ k ] );
    }

    return dataset;
  }.property(
    'content.employee',
    'content.employeeAndSpouse',
    'content.employeeAndChildren',
    'content.family'
  ),

  // Co-insurance Chart
  coinsuranceChart: {
    chartOptions: {},
    dataOptions: {
      type: 'donut'
    }
  },

  coinsuranceDataset: function () {
    var coinsurance = this.get('content.coInsurance'),
        sCoin       = ( coinsurance ) ? coinsurance.split('/') : [ 0, 0 ];

    return Ember.A([
      [ 'Plan', sCoin[ 0 ] ],
      [ 'Insured', sCoin[ 1 ] ]
    ]);
  }.property('coInsurance'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
