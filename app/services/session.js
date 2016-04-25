import Ember from 'ember';

const { computed } = Ember;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  authenticated: computed.bool('content.token'),

  destroySession () {
    if ( this.get('content.id') ) {
      this.get('store').find('session', this.get('content.id')).then(session => {
        session.destroyRecord();

        this.setProperties({
          content: null,
          didSetHeaders: false
        });
      });
    }

    Ember.$.ajaxSetup({
      headers: {
        'X-API-Token': null
      }
    });
  },

  createSession ( data, type ) {
    Ember.assert('Session#createSession must have data object to create a session', typeof data === 'object');

    var session = this.get('store').createRecord('session', {
      token:   data.token,
      expires: data.expiration,
      user:    data.user,
      type:    type || 'employee'
    });

    return session.save().then(record => {
      this.setProperties({
        content: record,
        authenticated: true
      });

      this.get('currentUser');
      return record;
    });
  },

  didSetHeaders: computed('content.token', function () {
    const token = this.get('content.token');

    Ember.$.ajaxSetup({
      headers: {
        'X-API-Token': token
      }
    });

    return !!token;
  }),

  currentUser: computed('content.user.id', 'authenticated', 'didSetHeaders', function () {
    if ( !this.get('content.user') || !this.get('authenticated') || !this.get('didSetHeaders') ) {
      return undefined;
    }

    Ember.assert('Session must have user id to fetch currentUser', this.get('content.user'));
    return this.get('store').find('user', this.get('content.user'));
  })
});
