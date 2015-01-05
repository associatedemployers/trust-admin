import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalize: function ( type, hash, prop ) {
    if( !hash.id && hash._id ) {
      hash.id = hash._id;
    }

    delete hash._id;
    delete hash.__v;

    return this._super( type, hash, prop );
  }
});
