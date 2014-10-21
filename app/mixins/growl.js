import Ember from 'ember';

/* Simple growl wrapper for fuss-free alerting */

export default Ember.Mixin.create({
  growl: function ( type, title, msg, delay, icon ) {
    console.log('growling it up', arguments);
    icon = ( icon ) ? icon : ( type === 'danger' ) ? 'fa fa-times-circle' : ( type === 'warning' ) ? 'fa fa-exclamation-triangle' : ( type === 'info' ) ? 'fa fa-info-circle' : 'fa fa-envelope';
    delay = delay || 4000;
    title = ' <strong>' + title + '</strong><br />';

    $.growl(
    {
      icon: icon,
      title: title,
      message: msg,
    }, {
      type: type,
      delay: delay,
      placement: {
        align: 'center'
      },
      z_index: 1060
    });
  },

  // Aliases
  growlError: function ( msg ) {
    console.log('growl err');
    this.growl( 'danger', 'Uh Oh!', msg, 0 );
  }
});
