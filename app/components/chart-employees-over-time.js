import Ember from 'ember';

export default Ember.Component.extend({
  height: '400px',
  chartOptions: {
    drawPoints: {
      size: 2,
      style: 'circle'
    },
    catmullRom: {
      parametrization: 'centripetal'
    }
  },

  didInsertElement: function () {
    this._super();
    this._draw();
  },

  dataset: function () {
    var company = this.get('company'),
        employees = this.get('employees');

    if( !company || !employees ) {
      return;
    }

    var currentDate   = moment(),
        startDate     = moment( company.get('legacyCompEffectDate') ),
        monthsBetween = Math.abs( startDate.diff( currentDate, 'months' ) ),
        dataSet       = [];

    var loopDate = moment( startDate ).date( 1 );

    var checkEmployee = function ( employee ) {
      var emp  = ( employee.get('legacyClientEmploymentDate') )  ? moment( employee.get('legacyClientEmploymentDate') )  : null,
          term = ( employee.get('legacyClientTerminationDate') ) ? moment( employee.get('legacyClientTerminationDate') ) : null;

      if( emp && emp.isBefore( loopDate ) ) {
        if( !term || term.isAfter( loopDate ) ) {
          count++;
        }
      } else if ( !emp && term && term.isAfter( loopDate ) ) {
        count++;
      }
    };

    for ( var i = 0; i < monthsBetween; i++ ) {
      var count = 0;

      employees.forEach( checkEmployee );

      dataSet.push({
        x: loopDate.format('YYYY-MM-DD'),
        y: count
      });

      loopDate.add(1, 'months');
    }

    return new vis.DataSet( dataSet );
  }.property('employees.@each', 'company').cacheable(),

  needsRedraw: function () {
    this._draw();
  }.observes('dataset'),

  _draw: function () {
    var chart      = this.get('chart'),
        visDataSet = this.get('dataset');

    if( !visDataSet ) {
      return;
    }

    if( chart ) {
      chart.setItems( visDataSet );
    } else {
      var options = this.get('chartOptions');
      options.graphHeight = this.get('height');

      chart = new vis.Graph2d( this.$()[0], visDataSet, options );

      this.set('chart', chart);
    }

    chart.fit();
  }
});
