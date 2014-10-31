import Ember from 'ember';
import BindToWindow from '../mixins/bind-to-window';

export default Ember.View.extend(BindToWindow, {
  tagName: 'nav',
  role: 'navigation',
  classNames: [ 'navbar', 'navbar-default', 'navbar-gradient' ],
  attributeBindings: [ 'role' ],

  didInsertElement: function () {
    this._super.apply( this, arguments );

    this.setupWindowBindings('scroll', 50);
  },

  windowDidScroll: function () {
    var hasClass = this.$().hasClass('navbar-fixed-top'),
        scrolledPast = $( window ).scrollTop() > 0;

    if( scrolledPast && !hasClass ) {
      this.$().addClass('navbar-fixed-top');
    } else if( !scrolledPast && hasClass ) {
      this.$().removeClass('navbar-fixed-top');
    }
  }
});
