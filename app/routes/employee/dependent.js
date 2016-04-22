import Ember from 'ember';

export default Ember.Route.extend({
  model ( params ) {
    return this.store.find('employee', params.employeeid).then(function ( employee ) {
      return employee.get('dependents').findBy('id', params.dependentid);
    });
  }
});
