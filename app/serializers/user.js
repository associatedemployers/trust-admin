// import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeHash: {
    user: function ( hash ) {
      if( hash.name ) {
        hash.firstName = hash.name.first;
        hash.lastName  = hash.name.last;

        delete hash.name;
      }

      return hash;
    }
  },

  serialize: function ( employee ) {
    var json = this._super.apply(this, arguments);

    json.name = {
      first: employee.get('firstName'),
      last:  employee.get('lastName')
    };

    delete json.firstName;
    delete json.lastName;

    json._id = json.id;

    delete json.id;

    console.log(json);

    return json;
  }
});
