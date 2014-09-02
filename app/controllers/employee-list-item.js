import Ember from 'ember';

export default Ember.Controller.extend({
  popoverContent: function () {
    var m = this.get('content'),
        html = '';

    html += '<p><strong><i class="fa fa-home"></i> Address</strong><br />';

    if( m.get('addressLine1') ) {
      html += m.get('addressLine1') + '<br />';
    } else {
      html += 'N/A';
    }

    if( m.get('addressLine2') ) {
      html += m.get('addressLine2') + '<br />';
    }

    if( m.get('city') && m.get('state') && m.get('zipcode') ) {
      html += m.get('city') + ', ' + m.get('state') + ' ' + m.get('zipcode') + '<br />';
    }

    html += '</p>';

    if( m.get('legacyClientTerminationDate') ) {
      var timeago = moment( m.get('legacyClientTerminationDate'), 'YYYY/MM/DD HH:mm:ss' ).fromNow();

      html += '<span class="text-danger">Terminated ' + timeago + ' on ' + m.get('legacyClientTerminationDate').split(' ')[0] + '</span>';
    }

    return html;
  }.property('content'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
