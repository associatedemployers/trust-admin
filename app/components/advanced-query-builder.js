import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement:function () {
    console.log(this);
  },

  queryArray: Ember.A(),

  fields: function () {
    console.log('getting fields');
    var rArray = [];
    console.log(this.get('resource.fields'));
    this.get('resource').get('fields').map(function ( a ) {
      rArray.push( a );
    });

    return rArray;
  }.property('resource'),

  actions: {
    addQuery: function ( type ) {
      console.log('queryArray');
      console.log('add query to', this.get('queryArray'));
      this.get('queryArray').pushObject({
        type: type
      });
    }
  }
});
