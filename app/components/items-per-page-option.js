import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: [ 'items-per-page-option' ],

  isActive: function () {
    console.log('changed', this.get('itemsPerPage'), this.get('option'));
    return this.get('itemsPerPage') === this.get('option');
  }.property('itemsPerPage', 'option'),

  actions: {
    setItemsPerPage: function ( n ) {
      this.set('itemsPerPage', parseFloat(n));
    }
  }
});
