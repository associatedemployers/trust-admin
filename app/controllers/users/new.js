import Ember from 'ember';
import GrowlMixin from '../../mixins/growl';

export default Ember.ObjectController.extend(GrowlMixin, {
  disableSubmit:            Ember.computed.any('informationIsNotComplete', 'loading'),
  informationIsNotComplete: Ember.computed.not('informationIsComplete'),
  informationIsComplete:    Ember.computed.and('content.firstName', 'content.lastName', 'content.email'),

  assignablePermissions: Ember.A(),
  assignedPermissions:   Ember.A(),

  setPermissionGroups: function () {
    var self = this;

    this.store.find('permission-group').then(function ( permissionGroups ) {
      self.set('assignablePermissions', permissionGroups);
    });
  }.observes('permissions', 'content'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    saveUser: function () {
      this.set('loading', true);
      var assignables = this.get('assignablePermissions');

      var user = this.get('content'),
          self = this;

      var allErrors = function ( res ) {
        var msg = ( res.responseText ) ? res.responseText : res.statusText;
        self.set('loading', false);
        self.growlError( msg );
        console.error( res );
      };

      this.set('loadingStatus', 'Creating user');

      user.save().then(function ( userRecord ) {
        self.set('loadingStatus', 'Creating permissions');

        Ember.RSVP.all(assignables.filter(function ( group ) {
          return group.get('permissions').filterBy('on', true).length > 0;
        }).map(function ( group ) {
          return Ember.RSVP.all(group.get('permissions').filterBy('on', true).map(function ( permissionOption ) {
            return self.store.createRecord('user-permission', {
              user:  userRecord,
              group: group,
              name:  permissionOption.name,
              type:  permissionOption.type
            }).save();
          }));
        })).then(function ( userPermissionGroups ) {
          userPermissionGroups.forEach(function ( permissionsInGroup ) {
            userRecord.get('permissions').pushObjects(permissionsInGroup);
          });

          self.set('loadingStatus', 'Saving user');

          return userRecord.save();
        }).then(function ( completeRecord ) {
            self.set('loading', false);
            self.transitionToRoute('user', completeRecord.id);
            self.growl( 'success', 'Created User', 'Successfully created user: ' + completeRecord.get('firstName'), 2500, 'fa fa-check');
        }).catch(allErrors);
      }).catch(allErrors);
    }
  }
});
