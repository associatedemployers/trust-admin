import Ember from 'ember';
import bindToWindow from '../mixins/bind-to-window';

const { on, run } = Ember;

export default Ember.Component.extend(bindToWindow, {
  tagName: 'nav',
  role: 'navigation',
  classNames: [ 'navbar', 'navbar-default', 'navbar-gradient' ],
  attributeBindings: [ 'role' ],

  setupWindow: on('init', function () {
    run.scheduleOnce('afterRender', () => {
      this.setupWindowBindings('scroll', 50);
    });
  }),

  windowDidScroll () {
    const hasClass = this.$().hasClass('navbar-fixed-top'),
          scrolledPast = $(window).scrollTop() > 0;

    if( scrolledPast && !hasClass ) {
      this.$().addClass('navbar-fixed-top');
    } else if( !scrolledPast && hasClass ) {
      this.$().removeClass('navbar-fixed-top');
    }
  },

  actions: {
    logout () {
      this.get('logout')();
    }
  }
});
