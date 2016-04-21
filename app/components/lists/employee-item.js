import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: [ 'resource-list-item', 'list-group-item' ],

  popoverContent: computed('employee', function () {
    var m = this.get('employee'),
        html = '';

    html += '<p><strong><i class="fa fa-home"></i> Address</strong><br />';
    html += m.get('hasAddress') ? m.get('addressFormatted') : 'N/A';
    html += '</p>';

    if ( m.get('legacyClientTerminationDate') ) {
      let timeago = moment(m.get('legacyClientTerminationDate')).fromNow();
      html += '<span class="text-danger">Terminated ' + timeago + ' on ' + moment(m.get('legacyClientTerminationDate')).format('MM/DD/YYYY') + '</span>';
    }

    return html;
  }),

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
