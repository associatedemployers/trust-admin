import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [ 'show' ],
  hasSelectedMetric: false,

  metrics: [
    'Employees Over Time',
    'Plan Participation'
  ],

  shownMetricDidChange: function () {
    var metricName = this.get('show'),
        metrics    = this.get('metricTypes'),
        self       = this;

    this.set('hasSelectedMetric', false);

    if( !metricName ) {
      return;
    }

    var overrideMetrics = metrics.map(function ( metric ) {
      var selected = metric.name === metricName;

      self.set('showing' + metric.name.replace(/\s/g, ''), selected);

      metric.active = selected;
      return metric;
    });

    this.setProperties({
      metricTypes: overrideMetrics,
      hasSelectedMetric: true
    });
  }.observes('show'),

  metricTypes: function () {
    return this.get('metrics').map(function ( metric ) {
      return {
        name: metric
      };
    });
  }.property('metrics'),

  actions: {
    showMetric: function ( metricName ) {
      this.set('show', metricName);
    }
  }
});
