import Ember from 'ember';

export default Ember.View.extend({
  didGetLoginError: function () {
    if( !this.get('controller.loginError') ) {
      return;
    }

    this._animateError();
  }.observes('controller.loginError'),

  _animateError: function () {
    var $loginContainer = this.$().find('.login-container');

    $loginContainer
      .velocity({
        rotateY: '180deg'
      }, {
        duration: 500,
        easing:   [ 100, 3 ] // Spring [ Tension, Friction ]
      })
      .delay(400)
      .velocity('reverse');
  }
});
