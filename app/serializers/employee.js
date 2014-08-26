import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    contactMethods: { embedded: 'always' },
    beneficiaries:  { embedded: 'always' },
    notes:          { embedded: 'always' }
  },

  normalizeHash: {
    employee: function ( hash ) {
      hash.id = hash._id;

      delete hash.__v;
      delete hash._id;

      if( hash.name ) {
        hash.firstName     = hash.name.first;
        hash.middleInitial = hash.name.middleInitial;
        hash.lastName      = hash.name.last;
        hash.suffix        = hash.name.suffix;

        delete hash.name;
      }

      if( hash.address ) {
        hash.addressLine1 = hash.address.line1;
        hash.addressLine2 = hash.address.line2;
        hash.city         = hash.address.city;
        hash.state        = hash.address.state;
        hash.zipcode      = hash.address.zipcode;

        delete hash.address;
      }

      return hash;
    }
  },

  serialize: function ( employee ) {
    var json = employee.toJSON();

    json.name = {
      first:         employee.get('firstName'),
      last:          employee.get('lastName'),
      middleInitial: employee.get('middleInitial'),
      suffix:        employee.get('suffix')
    };

    delete json.firstName;
    delete json.lastName;
    delete json.middleInitial;
    delete json.suffix;

    json.address = {
      line1:   employee.get('addressLine1'),
      line2:   employee.get('addressLine2'),
      city:    employee.get('city'),
      state:   employee.get('state'),
      zipcode: employee.get('zipcode')
    };

    delete json.addressLine1;
    delete json.addressLine2;
    delete json.city;
    delete json.state;
    delete json.zipcode;

    return json;
  }
});
