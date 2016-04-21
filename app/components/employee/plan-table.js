import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  queryParams: [ 'selectedCoverageType' ],
  levels: [ 'employee', 'employeeAndSpouse', 'employeeAndChildren', 'employeeAndFamily' ],
  selectedCoverageType: null,

  linkToCoverage: computed('selectedCoverageType', function () {
    var coverageType = this.get('selectedCoverageType');

    return coverageType ? coverageType + '-rate' : null;
  }),

  selectedCoverages: computed('selectedCoverageType', 'employee', function () {
    var coverageType = this.get('selectedCoverageType'),
        employee     = this.get('employee');

    return coverageType && employee ? employee.get(coverageType + 'Rates') : null;
  }),

  coverage: computed('employee', function () {
    var employee       = this.get('employee'),
        coverageLevels = employee.getProperties('medicalPlanCovers', 'dentalPlanCovers', 'visionPlanCovers', 'lifePlanCovers'),
        coverages      = employee.getProperties('medicalRates', 'dentalRates', 'visionRates', 'lifeRates'),
        rta            = Ember.A(),
        levels         = this.get('levels');

    var mapLevel = function ( level ) {
      this.o[level] = coverageLevels[this.sKey + 'PlanCovers'] === level;
    };

    for ( var key in coverages ) {
      if ( !coverages.hasOwnProperty(key) ) {
        continue;
      }

      var sKey = key.replace('Rates', '');
      var o = {
        type: sKey,
        plan: coverages[ key ]
      };

      levels.forEach(mapLevel.bind({ o, sKey }));

      o.tableLevel = {
        employee: o.employee || o.employeeAndSpouse || o.employeeAndChildren || o.employeeAndFamily,
        spouse:   o.employeeAndSpouse || o.employeeAndFamily,
        children: o.employeeAndChildren || o.employeeAndFamily
      };

      rta.push(o);
    }

    return rta;
  }),

  actions: {
    selectCoverage ( type ) {
      this.set('selectedCoverageType', type);
    },

    deselectCoverage () {
      this.set('selectedCoverageType', null);
    }
  }
});
