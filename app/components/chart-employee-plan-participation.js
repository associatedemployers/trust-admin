import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'chart-view' ],

  planTypes: [ 'Medical', 'Dental', 'Life', 'Vision' ],

  height: '400',
  chartOptions: {
    color: {
      pattern: [ '#21639E', '#D6D6D6' ]
    }
  },

  dataset: function () {
    var employees = this.get('employees'),
        planTypes = this.get('planTypes'),
        dataSet = Ember.A([
          [ 'Has Plan' ],
          [ 'Does Not Have Plan' ]
        ]);

    var activeEmployees = employees.filter(function ( employee ) {
      return !( employee.get('legacyClientTerminationDate') || employee.get('waived') );
    });

    planTypes.forEach(function ( planType ) {
      var on = activeEmployees.filter(function ( employee ) {
        var plans = employee._data[ planType.toLowerCase() + 'Rates' ];
        return ( !plans ) ? false : plans.length > 0;
      }).length;

      dataSet[ 0 ].pushObject( on );
      dataSet[ 1 ].pushObject( activeEmployees.length - on );
    });

    return dataSet;
  }.property(
    'employees.@each.medicalRates',
    'employees.@each.dentalRates',
    'employees.@each.lifeRates',
    'employees.@each.visionRates',
    'company'
  ),

  _draw: function () {
    Ember.run.next(this, function () {
      var chart = this.get('chart'),
          data  = {
            columns: this.get('dataset'),
            type: 'bar',
            labels: true
          };

      if( !chart ) {
        chart = window.c3.generate($.extend({
          bindto: '#' + this.get('elementId'),
          data: data,
          axis: {
            x: {
              type: 'category',
              categories: this.get('planTypes')
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
});
