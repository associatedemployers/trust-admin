import Ember from 'ember';

export default Ember.Object.extend({
  contentDidChange: function () {
    console.debug("Session :: Session did change");

    this.set('didSetHeaders', false);

    var token = this.get('content.token');

    if( token ) {
      console.debug("Session :: Setting up headers...");
      this._setupHeaders( token );
    }

    this.set('authenticated', !!token);
  }.observes('content'),

  logout: function () {
    var self = this;

    if( this.get('content.id') ) {
      this.store.find('session', this.get('content.id')).then(function ( session ) {
        session.destroyRecord();

        self.setProperties({
          authenticated: false,
          content: null
        });
      });
    }

    Ember.$.ajaxSetup({
      headers: {
        'X-API-Token': null
      }
    });
  },
  
  login: function ( data ) {
    var self = this;

    this.setProperties({
      loggingIn: true,
      loginError: null
    });

    Ember.assert('Session#login must have data object to pass to api#login', typeof data === 'object');

    Ember.$.post('/api/user/login', data).then(function ( res ) {
      var session = self.store.createRecord('session', {
        token:   res.token,
        expires: res.expiration,
        user:    res.user
      });

      session.save();

      self.setProperties({
        content: session,
        authenticated: true,
        loggingIn: false
      });

      self.get('currentUser');
    }, function (res) {
      self.setProperties({
        authenticated: false,
        loginError: res,
        loggingIn: false
      });
    });
  },
  
  _setupHeaders: function ( token ) {
    Ember.assert('Session must have token to setup headers', !!token);

    Ember.$.ajaxSetup({
      headers: {
        'X-API-Token': token
      }
    });

    this.set('didSetHeaders', true);
  },

  currentUser: function () {
    if(!this.get('content.user') || !this.get('authenticated')) {
      return;
    }

    Ember.assert('Session must have user id to fetch currentUser', this.get('content.user'));

    return this.store.find('user', this.get('content.user'));
  }.property('content.user', 'authenticated')
});