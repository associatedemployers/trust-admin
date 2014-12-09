import Ember from 'ember';

export default Ember.ObjectController.extend({
  queryParams: [ 'selectedCoverageType' ],
  levels: [ 'employee', 'employeeAndSpouse', 'employeeAndChildren', 'employeeAndFamily' ],
  selectedCoverageType: null,

  linkToCoverage: function () {
    var coverageType = this.get('selectedCoverageType');

    return ( coverageType ) ? coverageType + '-rate' : null;
  }.property('selectedCoverageType'),

  selectedCoverages: function () {
    var coverageType = this.get('selectedCoverageType'),
        employee     = this.get('content');

    return ( coverageType && employee ) ? employee.get(coverageType + 'Rates') : null;
  }.property('selectedCoverageType'),

  coverage: function () {
    var employee       = this.get('content'),
        coverageLevels = employee.getProperties('medicalPlanCovers', 'dentalPlanCovers', 'visionPlanCovers', 'lifePlanCovers'),
        coverages      = employee.getProperties('medicalRates', 'dentalRates', 'visionRates', 'lifeRates'),
        rta            = Ember.A(),
        levels         = this.get('levels');

    var mapLevel = function ( level ) {
      o[ level ] = coverageLevels[ sKey + 'PlanCovers' ] === level;
    };

    for ( var key in coverages ) {
      var sKey = key.replace('Rates', '');
      var o = {
        type: sKey,
        plan: coverages[ key ]
      };

      levels.forEach( mapLevel );

      o.tableLevel = {
        employee: ( o.employee || o.employeeAndSpouse || o.employeeAndChildren || o.employeeAndFamily ),
        spouse:   ( o.employeeAndSpouse || o.employeeAndFamily ),
        children: ( o.employeeAndChildren || o.employeeAndFamily )
      };

      rta.push( o );
    }

    return rta;
  }.property('content'),

  actions: {
    selectCoverage: function ( type ) {
      this.set('selectedCoverageType', type);
    },

    deselectCoverage: function () {
      this.set('selectedCoverageType', null);
    }
  }
});
