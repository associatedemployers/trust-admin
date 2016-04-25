import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('employees');
  this.route('employee', { path: 'employees/:id' }, function () {
    this.route('index', { path: '/summary' });
    this.route('edit');
    this.route('dependent', { path: '/dependents/:dependentid' }, function () {
      this.route('index', { path: '/summary' });
      this.route('edit');
    });
  });

  this.route('companies');
  this.route('company', { path: 'companies/:id' }, function () {
    this.route('index', { path: '/summary' });
    this.route('edit');
    this.route('employees');
    this.route('metrics');
  });

  this.route('users', function () {
    this.route('index', { path: '/' });
    this.route('new');
  });

  this.route('user', { path: 'user/:id' }, function () {
    this.route('index', { path: '/summary' });
    this.route('edit', { path: '/edit' });
  });

  this.route('medical-rates');
  this.route('medical-rate', { path: 'medical-rate/:id' }, function () {
    this.route('index', { path: '/summary' });
    this.route('edit');
  });

  this.route('medical-plans');
  this.route('medical-plan', { path: 'medical-plan/:id' }, function () {
    this.route('index', { path: '/summary' });
    this.route('edit');
  });

  this.route('search');
  this.route('metrics', {}, function () {
    this.route('index', { path: '/summary' });
    this.route('charts');
  });

  this.route('permissions');

  this.route('login');
  this.route('verify-account', { path: 'verify/:id' });

  this.route('loading');
  this.route('error');
  this.route('not-found');
  this.route('unauthorized');
  this.route('catchall', {path: '/*wildcard'});
});

export default Router;
