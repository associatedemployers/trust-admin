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
