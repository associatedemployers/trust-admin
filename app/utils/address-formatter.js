import titleCase from 'trust-admin/utils/title-case';

export default function addressFormatter () {
  var data = this.getProperties('addressLine1', 'addressLine2', 'city', 'state', 'zipcode', 'hasAddress');

  if( data.hasAddress === false ) {
    return '';
  }

  data.addressLine2 = ( data.addressLine2 ) ? data.addressLine2 + ' ' : '';
  data.zipcode      = ( data.zipcode ) ? data.zipcode : '';

  return titleCase( data.addressLine1 + ' ' + data.addressLine2 + data.city + ', ' + data.state + ' ' + data.zipcode );
}
