import Ember from 'ember';

export default Ember.Controller.extend({
  permissionsDisplay: null,

  shouldCreatePermissionsDisplay: function () {
    console.log('building permissionsDisplay');

    var self = this;

    this.get('content.permissions').then(function ( permissions ) {
      console.log('got permissions', permissions);
      var groups = permissions.mapBy('groupName').uniq();

      if( !groups ) {
        return self.set('permissionsDisplay', null);
      }

      self.set('permissionsDisplay', groups.map(function ( group ) {
        return {
          name: group,
          types: permissions.filterBy('groupName', group).mapBy('name').uniq()
        };
      }));
    });
  }.observes('content.permissions')
});
