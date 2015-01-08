import Ember from 'ember';
import GrowlMixin from '../mixins/growl';

export default Ember.ObjectController.extend(GrowlMixin, {
  inSnapshot: false,

  letterImageColor: function () {
    var defaultColor = {
      r: 255,
      g: 255,
      b: 255
    };

    var m = this.get('content');
    
    if ( !m ) {
      return defaultColor;
    }

    var name = m.getProperties('firstName', 'lastName'),
        al   = 'abcdefghijklmnopqrstuvwxyz'.split('');

    if ( !name.firstName || !name.lastName ) {
      return defaultColor;
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
    var m = this.get('content');

    if ( !m ) {
      return 'NA';
    }

    var n = m.getProperties('firstName', 'lastName');

    if ( !n.firstName || !n.lastName ) {
      return 'NA';
    }

    return n.firstName.charAt(0) + n.lastName.charAt(0);
  }.property('content.firstName', 'content.lastName'),

  loadSnapshot: function ( historyEvent, direction ) {
    this.growl('warning', 'Loading Snapshot', '', 1000);
    NProgress.start();

    var currentDocument = this.get('content'),
        self = this;

    if( !this.get('inSnapshot') && currentDocument.get('isDirty') ) {
      currentDocument.rollback();
    }

    var query = {
      snapshot:          historyEvent.get('id'),
      snapshotDirection: direction
    };

    this.store.findOneQuery('employee', currentDocument.get('id'), query).then(function ( employee ) {
      self.setProperties({
        content:         employee,
        inSnapshot:      true,
        snapshotDetails: historyEvent
      });

      NProgress.done();
    }).catch(function ( err ) {
      console.error(err);
    });
  },

  actions: {
    exitSnapshot: function () {
      this.setProperties({
        inSnapshot:      false,
        snapshotDetails: null
      });

      this.get('content').reload();
    }
  }
});
