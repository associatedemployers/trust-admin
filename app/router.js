import Ember from 'ember';

var Router = Ember.Router.extend({
  location: TrustAdminENV.locationType
});

Router.map(function() {
  this.resource('employees');
  this.resource('employee', { path: 'employees/:id' }, function () {
    this.route('index', { path: '/' });
    this.route('edit');
  });

  this.resource('company', { path: 'companies/:id' }, function () {
    this.route('index', { path: '/' });
    this.route('edit');
  });

  this.resource('companies');
  
});

export default Router;
