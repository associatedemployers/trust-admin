import Ember from 'ember';

export default Ember.ObjectController.extend({
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

    return n.firstName.charAt(0) + n.lastName.charAt(0);
  }.property('content.firstName', 'content.lastName'),

  formattedSSN: function () {
    var ssn = this.get('decryptedSSN');

    if( !ssn ) {
      return;
    }

    return ssn.toString().replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
  }.property('decryptedSSN'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    loadHistoryEvents: function () {
      this.set('isLoadingHistoryEvents', true);

      var employee = this.get('content'),
          self     = this;

      employee.get('historyEvents').then(function ( /* historyEvents */ ) {
        self.setProperties({
          isLoadingHistoryEvents: false,
          loadedHistoryEvents: true
        });
      }, function ( err ) {
        console.error( err );
        self.set('isLoadingHistoryEvents');
      });
    },

    decryptSSN: function () {
      var self = this;

      this.set('decryptingSSN', true);

      Ember.$.getJSON('/api/employee/decrypt-ssn', { ssn: this.get('content.ssn') }).then(function ( res ) {
        self.setProperties({
          decryptingSSN: false,
          decryptedSSN: res.decrypted
        });
      }, function ( err ) {
        console.error( err );
        self.set('decryptingSSN', false);
      });
    },

    encryptSSN: function () {
      this.set('decryptedSSN', null);
    }
  }
});
