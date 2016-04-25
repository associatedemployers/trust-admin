import Ember from 'ember';

export default Ember.Controller.extend({
  clientError: function () {
    var error = this.get('fromError');
    return error && error.status === 400;
  }.property('fromError')
});
