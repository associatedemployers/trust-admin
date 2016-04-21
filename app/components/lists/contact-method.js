import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['list-group-item'],

  isPhone: computed('contact.value', function () {
    var v = this.get('contact.value'),
        t = this.get('contact.type'),
        tLength = v.replace(/(?:\D)/g, '').length;

    return tLength > 6 && tLength < 12 && ( t === 'work' || t === 'home' || t === 'mobile' || t === 'cell' );
  }),

  isEmail: computed('contact.value', function () {
    var type = this.get('contact.type');

    return type === 'email';
  }),

  decoratedValue: computed('isPhone', 'isEmail', 'contact.value', function () {
    var v = this.get('contact.value');

    if( this.get('isPhone') ) {
      if( v.length === 10 ) {
        v = v.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      } else if( v.length === 11 ) {
        v = v.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1 ($2) $3-$4');
      }
    }

    return v;
  }),

  link: computed('isPhone', 'isEmail', 'contact.value', function () {
    var v = this.get('contact.value');

    return this.get('isPhone') ? 'tel:' + v : 'mailto:' + v;
  })
});
