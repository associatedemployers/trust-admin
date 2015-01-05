import Ember from 'ember';
import GrowlMixin from '../mixins/growl';

export default Ember.ObjectController.extend(GrowlMixin, {
  inSnapshot: false,
  originalDocument: null,

  letterImageColor: function () {
    var m    = this.get('content'),
        name = m.getProperties('firstName', 'lastName'),
        al   = 'abcdefghijklmnopqrstuvwxyz'.split('');

    if( !name.firstName || !name.lastName ) {
      return {
        r: 255,
        g: 255,
        b: 255
      };
    }

    var indices = {
      f: al.indexOf( name.firstName.charAt(0).toLowerCase() ) * 10,
      l: al.indexOf( name.lastName.charAt(0).toLowerCase() ) * 10
    };

    indices.o = Math.abs( indices.f - indices.l );

    return {
      r: ( indices.f > 255 ) ? 255 : indices.f,
      g: ( indices.l > 255 ) ? 255 : indices.l,
      b: ( indices.o > 255 ) ? 255 : indices.o
    };

  }.property('content.firstName', 'content.lastName'),

  letterImageText: function () {
    var m = this.get('content'),
        n = m.getProperties('firstName', 'lastName');

    if ( !n.firstName || !n.lastName ) {
      return 'NA';
    }

    return n.firstName.charAt(0) + n.lastName.charAt(0);
  }.property('content.firstName', 'content.lastName'),

  exitSnapshot: function () {
    this.set('inSnapshot', false);
    this.store.pushPayload('employee', {
      employee: this.get('originalDocument')
    });
  },

  loadSnapshot: function ( snapshotData ) {
    // TODO: REFACTOR TO USE SNAPSHOT: ID VIA API
    console.log('loading snapshot');
    var originalDocument = this.get('content');


    if( originalDocument.get('isDirty') ) {
      originalDocument.rollback();
    }

    this.setProperties({
      inSnapshot:       true,
      originalDocument: originalDocument
    });
    snapshotData.id = snapshotData._id;
    delete snapshotData._id;
    console.log(snapshotData);

    this.store.pushPayload('employee', {
      employee: snapshotData
    });
  }
});
