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

    if( !n.firstName || !n.lastName ) {
      return '';
    }

    return n.firstName.charAt(0) + n.lastName.charAt(0);
  }.property('content.firstName', 'content.lastName'),
});
