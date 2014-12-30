import Ember from 'ember';
import GrowlMixin from 'trust-admin/mixins/growl';

export default Ember.Controller.extend(GrowlMixin, {
  notAllowSubmit: Ember.computed.not('allowSubmit'),
  loadingAccount: true,
  id: null,

  allowSubmit: function () {
    var d = this.getProperties('password', 'passwordRe', 'verifying');

    return d.password && d.password.length > 4 && d.password === d.passwordRe && !d.verifying;
  }.property('password', 'passwordRe', 'verifying'),

  verifyAccount: function () {
    this.set('loadingAccount', true);

    var id   = this.get('id'),
        self = this;

    var fail = function () {
      self.setProperties({
        loadingAccount: false,
        validLink:      false
      });
    };

    if( !id || typeof id !== 'string' ) {
      return fail();
    }

    Ember.$.get('/api/user/verify/' + id, function ( res, status ) {
      self.setProperties({
        loadingAccount: false,
        validLink:      status === 'success'
      });
    }).fail(function ( err ) {
      var msg = ( err.responseText ) ? err.responseText : err.statusText;
      self.growlError( msg );
      console.error( err );
      fail();
    });
  }.observes('id'),

  actions: {
    verify: function () {
      if( !this.get('allowSubmit') ) {
        return;
      }

      this.set('verifying', true);

      var id   = this.get('id'),
          self = this;

      Ember.$.post('/api/user/verify/' + id, { password: self.get('password') }, function ( /* res */ ) {
        self.set('verifying', false);
        self.transitionToRoute('login');
      }).fail(function ( err ) {
        var msg = ( err.responseText ) ? err.responseText : err.statusText;
        self.growlError( msg );
        console.error( err );
        self.set('verifying', false);
      });

    }
  }
});
