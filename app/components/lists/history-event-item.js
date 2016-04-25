import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'list-group-item', 'history-event-item' ],

  user: computed('event.updater', function () {
    // Populate user information
    let updater = this.get('event.updater');
    return updater ? 'User' : 'System'; // Populate in place of user
  }),

  actions: {
    selectEvent () {
      this.get('selectEvent')(this.get('event'));
    }
  }
});
