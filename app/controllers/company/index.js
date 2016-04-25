import Ember from 'ember';
import GrowlMixin from 'trust-admin/mixins/growl';

export default Ember.Controller.extend(GrowlMixin, {
  selectedLocation: function () {
    var office   = this.get('selectedOfficeLocation'),
        location = office || this.get('content');

    return location.get('addressFormatted');
  }.property('selectedOfficeLocation'),

  actions: {
    selectOffice: function ( office ) {
      this.set('selectedOfficeLocation', office);
    },

    loadEmployeeHardStats: function () {
      this.setProperties({
        loadingEmployeeHardStats:     true,
        activeEmployees:              0,
        terminatedEmployees:          0,
        activeParticipatingEmployees: 0,
        activeWaivedEmployees:        0
      });

      var self = this;

      this.get('content.employees').then(function ( res ) {
        var employees = res.get('content');

        employees.forEach(function ( employee ) {
          var term = employee.get('legacyClientTerminationDate');

          if( term ) {
            self.incrementProperty('terminatedEmployees');
          } else {
            if( employee.get('waived') ) {
              self.incrementProperty('activeWaivedEmployees');
            }
          }
        });

        var numActive = employees.length - self.get('terminatedEmployees');

        self.setProperties({
          activeEmployees:              numActive,
          activeParticipatingEmployees: numActive - self.get('activeWaivedEmployees'),
          loadedEmployeeHardStats:      true,
          loadingEmployeeHardStats:     false
        });
      });
    }
  }
});
