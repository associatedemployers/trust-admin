import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: [ 'list-group-item' ],
  limit: 35,

  longerThanLimit: computed('note.text', function () {
    return this.get('note.text').length > this.get('limit') - 3;
  }),

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
