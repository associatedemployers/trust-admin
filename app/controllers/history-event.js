import Ember from 'ember';

export default Ember.Controller.extend({
  user: function () {
    // Populate user information
    var updater = this.get('content.updater');

    return ( updater ) ? "User" : 'System'; // Populate in place of user
  }.property('content.updater')
});
