import Ember from 'ember';
import GrowlMixin from 'trust-admin/mixins/growl';
import TabsMixin from 'trust-admin/mixins/tabs';
import TooltipsMixin from 'trust-admin/mixins/tooltips';


export default Ember.Controller.extend(GrowlMixin, TabsMixin, TooltipsMixin, {
  isLoadingHistoryEvents: true,
  queryParams: [ 'infoTab' ],
  infoTab: 0,

  tabs: [
    {
      order: 0,
      name: '<i class="fa fa-fw fa-user-md"></i> Plans',
      partial: 'employee-plan-tab'
    },
    {
      order: 1,
      name: '<i class="fa fa-fw fa-users"></i> Dependents',
      partial: 'employee-dependents-tab'
    },
    {
      order: 2,
      name: '<i class="fa fa-fw fa-usd"></i> Beneficiaries',
      partial: 'employee-beneficiaries-tab'
    },
    {
      order: 3,
      name: '<i class="fa fa-fw fa-phone"></i> Contact Methods',
      partial: 'employee-contacts-tab'
    },
    {
      order: 4,
      name: '<i class="fa fa-fw fa-file-text"></i> Notes',
      partial: 'employee-notes-tab'
    }
  ],

  infoTabs: [
    {
      order: 0,
      name: '<i class="fa fa-fw fa-paperclip"></i> Overview',
      partial: 'employee-overview-info-tab'
    },
    {
      order: 1,
      name: '<i class="fa fa-fw fa-map-marker"></i> Location',
      partial: 'employee-location-info-tab'
    }
  ],

  _infoTabChanged: function () {
    var tabs     = this.get('infoTabs'),
        tabIndex = this.get('infoTab');

    this.set('infoTabs', tabs.map(function ( tab, index ) {
      tab.active = ( index === tabIndex );
      return tab;
    }));
  }.observes('infoTab').on('init'),

  _getHistoryEvents: function () {
    this.set('isLoadingHistoryEvents', true);

    var employee = this.get('content'),
        self     = this;

    if( !employee ) {
      return this.set('isLoadingHistoryEvents', false);
    }

    employee.get('historyEvents').then(function ( /* historyEvents */ ) {
      self.setProperties({
        isLoadingHistoryEvents: false,
        loadedHistoryEvents: true
      });
    }).catch(function ( err ) {
      self.growlError( 'HistoryEvent :: ' + err.statusText );
      console.error( err );
      self.set('isLoadingHistoryEvents', false);
    });
  }.observes('content'),

  formattedSSN: function () {
    var ssn = this.get('decryptedSSN');

    return ( ssn ) ? ssn.toString().replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3') : null;
  }.property('decryptedSSN'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    showInfoTab: function ( index ) {
      this.set('infoTab', index);
    },

    decryptSSN: function () {
      var self = this;

      this.set('decryptingSSN', true);

      Ember.$.getJSON('/api/employee/decrypt-ssn', { ssn: this.get('content.ssn') }).then(function ( res ) {
        self.setProperties({
          decryptingSSN: false,
          decryptedSSN: res.decrypted
        });
      }, function ( err ) {
        console.error( err );
        self.set('decryptingSSN', false);
      });
    },

    encryptSSN: function () {
      this.set('decryptedSSN', null);
    }
  }
});
