import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('employees');
  this.resource('employee', { path: 'employees/:id' }, function () {
    this.route('index', { path: '/' });
    this.route('edit');

    // Nested Resources
    this.resource('dependent', { path: '/dependents/:dependentid' });
  });

  this.resource('company', { path: 'companies/:id' }, function () {
    this.route('index', { path: '/' });
    this.route('edit');
  });

  this.resource('companies');
  
  this.route('search');
  
});

export default Router;
