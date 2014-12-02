import Ember from 'ember';

export default Ember.Controller.extend({
  hasSelectedMetric: false,
  metricTypes: [
    {
      name: 'Employees Over Time'
    },
    {
      name: 'Employees With Medical'
    },
    {
      name: 'Employees With Life'
    },
    {
      name: 'Employees With Dental'
    },
    {
      name: 'Employees With Vision'
    }
  ],

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
