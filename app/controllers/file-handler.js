import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    selectFile: function ( file ) {
      this.set('selectedFile', file);
    }
  }
});
