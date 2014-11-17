import Ember from 'ember';
import GrowlMixin from '../../mixins/growl';

export default Ember.ObjectController.extend(GrowlMixin, {
  disableSubmit:            Ember.computed.any('informationIsNotComplete', 'loading'),
  informationIsNotComplete: Ember.computed.not('informationIsComplete'),
  informationIsComplete:    Ember.computed.and('content.firstName', 'content.lastName', 'content.email'),

  assignablePermissions: Ember.A(),

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
