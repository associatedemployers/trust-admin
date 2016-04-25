import Ember from 'ember';

const { run } = Ember;

export default Ember.Mixin.create({
  /*
    Mixin setup
    NOTE: Must be implemented on init, didTransition, or didInsertElement hooks
  */
  setupWindowBindings ( events, throttle ) {
    $(window).on(events, { emEl: this, throttle: throttle }, this._bindToProperties);
  },

  /*
    Mixin teardown
    NOTE: Can be implemented on willTransition or willDestroyElement hooks
  */
  teardownWindowBindings ( events ) {
    $(window).off(events, this._bindToProperties);
  },

  _bindToProperties ( event ) {
    let fn = event.data.emEl['windowDid' + event.type.charAt(0).toUpperCase() + event.type.slice(1)];

    if ( typeof fn === 'function' ) {
      let throttle = event.data.throttle || 500;
      run.throttle(event.data.emEl, fn, throttle);
    }
  }
});
