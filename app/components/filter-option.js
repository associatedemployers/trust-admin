import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submitFilter: function () {
      var c       = this.getProperties('key', 'filterValue'),
          filters = this.get('filters');

      filters = {};

      if( c.key ) {
        filters[c.key] = c.filterValue;
      }

      this.set('filters', filters);
    }
  }
});
