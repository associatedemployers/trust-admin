import Ember from 'ember';

/* Simple growl wrapper for fuss-free alerting */

export default Ember.Mixin.create({
  growlError: function ( msg ) {
    $.growl(
    {
      icon: 'fa fa-exclamation-triangle',
      title: ' <strong>Uh Oh!</strong><br />',
      message: msg
    }, {
      type: 'danger',
      delay: 0,
      placement: {
        align: 'center'
      }
    });
  }
});
