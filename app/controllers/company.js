import Ember from 'ember';
import GrowlMixin from 'trust-admin/mixins/growl';

export default Ember.ObjectController.extend(GrowlMixin, {
  needs: [ 'application' ],
  currentPath: Ember.computed.alias('controllers.application.currentPath'),

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
  ],

  _pathChanged: function () {
    var tabs        = this.get('tabs'),
        currentPath = this.get('currentPath');

    this.set('tabs', tabs.map(function ( tab ) {
      tab.active = ( currentPath === tab.link );

      return tab;
    }));
  }.observes('currentPath')
});
