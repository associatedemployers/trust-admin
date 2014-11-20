import Ember from 'ember';
import { emailRegexp } from '../utils/regex-validators';

export default Ember.Controller.extend({
  notAllowSubmit: Ember.computed.not('allowSubmit'),
  notLoggingIn:   Ember.computed.not('loggingIn'),
  allowSubmit:    Ember.computed.and('validEmail', 'validPassword', 'notLoggingIn'),

  validEmail: function () {
    var email = this.get('email');

    return email && emailRegexp.test( email );
  }.property('email'),

  validPassword: function () {
    var password = this.get('password');

    return password && password.length > 2;
  }.property('password'),

  // Controls error reset
  receivedInput: function () {
    if( this.get('loginError') ) {
      this.set('loginError', null);
    }
  }.observes('email', 'password'),

  shouldParseLoginError: function () {
    var e = this.get('session.loginError');

    if( !e ) {
      return null;
    }

    this.set('loginError', ( typeof e === 'string' ) ? e : ( e.status === 401 ) ? 'Wrong password or no user with that email. Please try again.' : 'Problem communicating with server, please try again. <br /><span class="text-muted">' + e.responseText + '</span>');
  }.observes('session.loginError'),

  authenticationChanged: function () {
    if( !this.session.get('authenticated') || !this.session.get('didSetHeaders') ) {
      return;
    }

    this.setProperties({
      email:    null,
      password: null
    });

    var transition = this.get('savedTransition');

    if( transition ) {
      this.set('savedTransition', null);
      transition.retry();
    } else {
      this.transitionToRoute('index');
    }
  }.observes('session.authenticated'),

  actions: {
    login: function () {
      var loginInfo = this.getProperties('email', 'password');

      if( loginInfo.email && loginInfo.password ) {
        this.session.login( loginInfo );
      }
    }
  }
});