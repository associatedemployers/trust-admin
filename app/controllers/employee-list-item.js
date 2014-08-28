import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
