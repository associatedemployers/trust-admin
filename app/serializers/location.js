// import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeHash: {
    location: function ( hash ) {
      if( hash.address ) {
        hash.addressLine1 = hash.address.line1;
        hash.addressLine2 = hash.address.line2;
        hash.city         = hash.address.city;
        hash.state        = hash.address.state;
        hash.zipcode      = hash.address.zipcode;

        delete hash.address;
      }

      if( hash.contact ) {
        hash.phone = hash.contact.phone;
        hash.fax   = hash.contact.fax;

        delete hash.contact;
      }

      return hash;
    }
  }
});
