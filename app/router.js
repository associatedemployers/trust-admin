import Ember from 'ember';

var Router = Ember.Router.extend({
  location: TrustAdminENV.locationType
});

Router.map(function() {
  this.resource('employees');
  this.resource('companies');
});

export default Router;
