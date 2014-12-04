import Ember from 'ember';
import GrowlMixin from 'trust-admin/mixins/growl';
import NavTabsMixin from 'trust-admin/mixins/nav-tabs';

export default Ember.ObjectController.extend(GrowlMixin, NavTabsMixin, {
  tabs: [
    {
      icon: 'fa-newspaper-o',
      name: 'Summary',
      link: 'company.index'
    },
    {
      icon: 'fa-users',
      name: 'Employees',
      link: 'company.employees'
    },
    {
      icon: 'fa-area-chart',
      name: 'Metrics',
      link: 'company.metrics'
    }
  ]
});
