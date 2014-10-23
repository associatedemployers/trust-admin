// import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeHash: {
    historyEvent: function ( hash ) {
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
