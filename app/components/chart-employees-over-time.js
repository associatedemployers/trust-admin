import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'chart-view' ],

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

  dataset: function () {
    var company = this.get('company'),
        employees = this.get('employees');

    if( !company || !employees ) {
      return Ember.A();
    }

    var currentDate   = moment(),
        startDate     = moment( company.get('legacyCompEffectDate') ),
        monthsBetween = Math.abs( startDate.diff( currentDate, 'months' ) ),
        dataSet       = Ember.A();

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

      dataSet.addObject({
        x: loopDate.format('YYYY-MM-DD'),
        y: count
      });

      loopDate.add(1, 'months');
    }

    return dataSet;
  }.property('employees.@each.legacyClientEmploymentDate', 'company'),

  _draw: function () {
    Ember.run.next(this, function () {
      var chart      = this.get('chart'),
          visDataSet = new vis.DataSet( this.get('dataset') );

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
    });
  }.observes('dataset.@each').on('didInsertElement'),

  actions: {
    refocus: function () {
      var chart = this.get('chart');

      if( chart ) {
        chart.fit();
      }
    }
  }
});
