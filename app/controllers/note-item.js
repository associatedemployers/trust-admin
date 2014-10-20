import Ember from 'ember';

export default Ember.ObjectController.extend({
  limit: 35,
  longerThanLimit: function () {
    return this.get('content.text').length > ( this.get('limit') - 3 );
  }.property('content.text'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
