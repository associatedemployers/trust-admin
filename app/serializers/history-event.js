import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeHash: {
    historyEvent: function ( hash ) {
      hash.id = hash._id;

      delete hash._id;
      delete hash.__v;

      if( hash.documents ) {
        hash.updatedDocument  = hash.documents.updated;
        hash.previousDocument = hash.documents.previous;

        delete hash.documents;
      }

      delete hash.documentModel;

      return hash;
    }
  }
});
