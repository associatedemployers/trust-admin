import Ember from 'ember';
import NavTabsMixin from 'trust-admin/mixins/nav-tabs';

export default Ember.Controller.extend(NavTabsMixin, {
  tabs: [
    {
      icon: 'fa-database',
      name: 'Stats',
      link: 'metrics.index'
    },
    {
      icon: 'fa-pie-chart',
      name: 'Charts',
      link: 'metrics.charts'
    }
  ]
});
