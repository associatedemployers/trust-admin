import Ember from 'ember';

export default Ember.ArrayController.extend(Ember.SortableMixin, {
  sortProperties: [ 'time_stamp' ],
  sortAscending: true,

  numberOfFiles: function () {
    var content = this.get('content.content.content');
    return ( content ) ? content.length : 0;
  }.property('content.@each'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    selectFile: function ( file ) {
      this.set('selectedFile', file);
    },

    deselectFile: function () {
      this.set('selectedFile', null);
    }
  }
});
