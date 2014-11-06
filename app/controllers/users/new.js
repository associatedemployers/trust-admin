import Ember from 'ember';
import GrowlMixin from '../../mixins/growl';
import { permissions as permissionGroups } from '../../utils/globals';

export default Ember.ObjectController.extend(GrowlMixin, {
  disableSubmit:            Ember.computed.any('informationIsNotComplete', 'loading'),
  informationIsNotComplete: Ember.computed.not('informationIsComplete'),
  informationIsComplete:    Ember.computed.and('content.firstName', 'content.lastName', 'content.email'),
  permissions:              permissionGroups,
  permissionGroups:         Ember.A(),

  setPermissionGroups: function () {
    this.set('content.permissions', this.get('permissions').map(function ( permissionGroup ) {
      if( !permissionGroup.permissions ) {
        permissionGroup.permissions = [{ name: 'Create', type: 'post', value: true }, { name: 'Read', type: 'get', value: true }, { name: 'Update', type: 'put', value: true }, { name: 'Delete', type: 'delete', value: true }];
      }

      return permissionGroup;
    }));
  }.observes('permissions', 'content'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    saveUser: function () {
      this.set('loading', true);

      var user = this.get('content'),
          self = this;

      console.log('saving');

      user.save().then(function ( record ) {
        self.setProperties({
          loading: false
        });

        self.transitionToRoute('user', record.id);
        self.growl( 'success', 'Created User', 'Successfully created user: ' + record.get('firstName'), 2500, 'fa fa-check');
      }, function ( err ) {
        var msg = ( err.responseText ) ? err.responseText : err.statusText;
        self.set('loading', false);
        self.growlError( msg );
        console.error( err );
      });
    }
  }
});
