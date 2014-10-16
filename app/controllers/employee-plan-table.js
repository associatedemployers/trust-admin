import Ember from 'ember';

export default Ember.ObjectController.extend({
  levels: [ 'employee', 'employeeAndSpouse', 'employeeAndChildren', 'employeeAndFamily' ],

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
  }.property('content')
});
