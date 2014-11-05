import Ember from 'ember';
import GrowlMixin from '../../mixins/growl';

export default Ember.ObjectController.extend(GrowlMixin, {
  queryParams: [ 'tab' ],
  tab: 0,
  isLoadingHistoryEvents: true,

  tabs: [
    {
      index: 0,
      name: '<i class="fa fa-fw fa-user-md"></i> Plans',
      partial: 'employee-plan-tab'
    },
    {
      index: 1,
      name: '<i class="fa fa-fw fa-users"></i> Dependents',
      partial: 'employee-dependents-tab'
    },
    {
      index: 2,
      name: '<i class="fa fa-fw fa-usd"></i> Beneficiaries',
      partial: 'employee-beneficiaries-tab'
    },
    {
      index: 3,
      name: '<i class="fa fa-fw fa-phone"></i> Contact Methods',
      partial: 'employee-contacts-tab'
    },
    {
      index: 4,
      name: '<i class="fa fa-fw fa-file-text"></i> Notes',
      partial: 'employee-notes-tab'
    }
  ],

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

  _tabChanged: function () {
    var tabs     = this.get('tabs'),
        tabIndex = this.get('tab');

    this.set('tabs', tabs.map(function ( tab, index ) {
      tab.active = ( index === tabIndex );
      return tab;
    }));
  }.observes('tab').on('init'),

  formattedSSN: function () {
    var ssn = this.get('decryptedSSN');

    return ( ssn ) ? ssn.toString().replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3') : null;
  }.property('decryptedSSN'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    showTab: function ( index ) {
      this.set('tab', index);
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
