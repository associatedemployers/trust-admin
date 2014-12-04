/*
  @mixin nav-tabs
 
  Provides an interface for tab-driven nav within nested routes. Specify tabs like:
  tabs: [
    {
      icon: 'fa-my-icon',
      name: 'My Link',
      link: 'path.to.nested.link'
    }
  ]
*/

import Ember from 'ember';

export default Ember.Mixin.create({
  needs: [ 'application' ],
  currentPath: Ember.computed.alias('controllers.application.currentPath'),

  _pathChanged: function () {
    var tabs        = this.get('tabs'),
        currentPath = this.get('currentPath');

    this.set('tabs', tabs.map(function ( tab ) {
      tab.active = ( currentPath === tab.link );

      return tab;
    }));
  }.observes('currentPath')
});
