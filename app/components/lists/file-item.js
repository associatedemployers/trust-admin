import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'list-group-item' ],

  actions: {
    selectFile () {
      this.get('selectFile')(this.get('file'));
    }
  }
});
