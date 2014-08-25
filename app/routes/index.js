import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('employee', { limit: 30, page: 1 });
  }
});
