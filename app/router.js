import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('employees');
  this.resource('employee', { path: 'employees/:id' }, function () {
    this.route('index', { path: '/' });
    this.route('edit');
  });

  this.route('companies');
  this.resource('company', { path: 'companies/:id' }, function () {
    this.route('index', { path: '/' });
    this.route('edit');  
    this.route('employees');
    this.route('metrics');
  });

  this.resource('users', function () {
    this.route('index', { path: '/' });
    this.route('new');
  });

  this.resource('user', { path: 'user/:id' }, function () {
    this.route('index', { path: '/' });
    this.route('edit', { path: '/edit' });
  });

  this.route('medical-rates');
  this.resource('medical-rate', { path: 'medical-rate/:id' }, function () {
    this.route('index', { path: '/' });
    this.route('edit');
  });

  this.route('search');
  this.resource('metrics', {}, function () {
    this.route('index', { path: '/' });
    this.route('charts');
  });

  // Nested Resources
  this.resource('employee.dependent', { path: 'employees/:employeeid/dependents/:dependentid' }, function () {
    this.route('index', { path: '/' });
    this.route('edit');
  });

  this.route('permissions');

  this.route('login');
  this.route('loading');
  this.route('user/edit');
});

export default Router;
