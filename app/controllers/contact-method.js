import Ember from 'ember';

export default Ember.Controller.extend({
  isPhone: function () {
    var v = this.get('content.value'),
        t = this.get('content.type'),
        tLength = v.replace(/(?:\D)/g, '').length;

    return ( tLength > 6 && tLength < 12 && ( t === 'work' || t === 'home' || t === 'mobile' || t === 'cell' ) );
  }.property('content.value'),

  isEmail: function () {
    var type = this.get('content.type');

    return type === 'email';
  }.property('content.value'),

  decoratedValue: function () {
    var v = this.get('content.value');

    if( this.get('isPhone') ) {
      if( v.length === 10 ) {
        v = v.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      } else if( v.length === 11 ) {
        v = v.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1 ($2) $3-$4');
      }
    }

    return v;
  }.property('isPhone', 'isEmail', 'content.value'),

  link: function () {
    var v = this.get('content.value');

    return ( this.get('isPhone') ) ? 'tel:' + v : 'mailto:' + v;
  }.property('isPhone', 'isEmail', 'content.value')
});
