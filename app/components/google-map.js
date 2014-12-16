import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'iframe',
  attributeBindings: [ 'height', 'frameborder', 'style', 'src' ],

  apiKey: 'AIzaSyAdZYal8rWS7lK46vLBTdTSWHq9-OdS7II',
  height: "400",
  frameborder: "0",
  style: "width: 100%; border: 0",
  src: function () {
    return 'https://www.google.com/maps/embed/v1/place?key=' + this.get('apiKey') + '&q=' + this.get('location').replace(/\s/g, '+');
  }.property('location')
});
