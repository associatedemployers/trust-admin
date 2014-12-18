import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    permissions: {
      serialize:   'ids',
      deserialize: 'ids'
    }
  },

  normalizeHash: {
    user: function ( hash ) {
      if( hash.name ) {
        hash.firstName = hash.name.first;
        hash.lastName  = hash.name.last;

        delete hash.name;
      }

      if( hash.login ) {
        hash.email = hash.login.email;

        delete hash.login;
      }

      return hash;
    }
  },

  serialize: function ( user ) {
    var json = this._super.apply(this, arguments);

    json.name = {
      first: user.get('firstName'),
      last:  user.get('lastName')
    };

    json.login = {
      email:    user.get('email'),
      password: user.get('password')
    };

    delete json.firstName;
    delete json.lastName;

    delete json.email;
    delete json.password;

    json._id = json.id;

    delete json.id;

    console.log(json);

    return json;
  }
});
