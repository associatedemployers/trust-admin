import Ember from 'ember';
import GrowlMixin from 'trust-admin/mixins/growl';

export default Ember.ObjectController.extend(GrowlMixin, {
  notAllowSave: Ember.computed.not('allowSave'),
  notSaving:    Ember.computed.not('saving'),
  allowSave:    Ember.computed.and('content.email', 'content.firstName', 'content.lastName', 'content.isDirty', 'notSaving'),

  actions: {
    save: function () {
      if( !this.get('allowSave') ) {
        return;
      }

      this.set('saving', true);

      var user = this.get('content'),
          self = this;

      user.save().then(function () {
        self.growl('success', 'Saved', 'Successfully saved changes to ' + user.get('fullName'), 2500, 'fa fa-check');
        self.set('saving', false);
        self.transitionToRoute('user.index', user);
      }).catch(function ( err ) {
        var msg = ( err.responseText ) ? err.responseText : err.statusText;
        self.set('saving', false);
        self.growlError( msg );
        console.error( err );
      });
    }
  }
});
