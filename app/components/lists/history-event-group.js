import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'history-event-group' ],

  actions: {
    selectEvent ( event ) {
      this.get('selectEvent')(event);
    }
  }
});
