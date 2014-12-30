import Ember from 'ember';
import GrowlMixin from 'trust-admin/mixins/growl';

export default Ember.ObjectController.extend(GrowlMixin, {
  isDoingAction: Ember.computed.or('isDeleting'),

  actions: {
    deleteUser: function () {
      this.set('isDeleting', true);

      var user = this.get('content'),
          self = this;

      user.destroyRecord().then(function () {
        self.growl( 'danger', 'Deleted', 'Successfully deleted user', 2500, 'fa fa-check');
        self.set('isDeleting', false);
        self.transitionToRoute('users');
      }).catch(function ( err ) {
        var msg = ( err.responseText ) ? err.responseText : err.statusText;
        self.set('isDeleting', false);
        self.growlError( msg );
        console.error( err );
      });
    }
  }
});
