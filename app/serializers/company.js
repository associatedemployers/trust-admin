import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeHash: {
    company: function ( hash ) {
      hash.id = hash._id;

      delete hash._id;
      delete hash.__v;

      if( hash.name ) {
        hash.name = hash.name.company;
      }

      if( hash.contact ) {
        hash.contactName  = hash.contact.name;
        hash.contactPhone = hash.contact.phone;
        hash.contactFax   = hash.contact.fax;

        delete hash.contact;
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
  }
});
