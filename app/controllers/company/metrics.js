import Ember from 'ember';

export default Ember.Controller.extend({
  hasSelectedMetric: false,
  metrics: [
    'Employees Over Time',
    'Employees With Medical',
    'Employees With Life',
    'Employees With Dental',
    'Employees With Vision'
  ],

  metricTypes: function () {
    return this.get('metrics').map(function ( metric ) {
      return {
        name: metric
      };
    });
  }.property('metrics'),

  actions: {
    showMetric: function ( metricName ) {
      this.set('hasSelectedMetric', true);

      var metrics = this.get('metricTypes'),
          self    = this;

      this.set('metricTypes', metrics.map(function ( metric ) {
        var selected = metric.name === metricName;

        self.set('showing' + metric.name.replace(/\s/g, ''), selected);
        metric.active = selected;
        return metric;
      }));
    }
  }
});
