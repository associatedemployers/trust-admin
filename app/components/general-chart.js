import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'chart-view' ],

  height: '400',
  chartOptions: {},
  dataOptions: {},

  _draw: function () {
    this.set('isLoadingChart', true);

    Ember.run.next(this, function () {
      var chart = this.get('chart'),
          data = $.extend({
            columns: this.get('dataset')
          }, this.get('dataOptions'));

      Ember.assert('Dataset provided to Component#general-chart#_draw should be an array', Ember.isArray(data.columns));

      if( !chart ) {
        chart = window.c3.generate($.extend({
          bindto: '#' + this.get('elementId'),
          data: data,
          size: {
            height: this.get('height')
          }
        }, this.get('chartOptions')));
      } else {
        chart.load( data );
      }

      this.setProperties({
        isLoadingChart: false,
        chart:          chart
      });
    });
  }.observes('dataset.[]').on('didInsertElement')
});
