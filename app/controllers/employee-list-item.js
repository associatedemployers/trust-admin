import Ember from 'ember';

export default Ember.ObjectController.extend({
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
      var timeago = moment( m.get('legacyClientTerminationDate') ).fromNow();

      html += '<span class="text-danger">Terminated ' + timeago + ' on ' + moment(m.get('legacyClientTerminationDate')).format('MM/DD/YYYY') + '</span>';
    }

    return html;
  }.property('content'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
