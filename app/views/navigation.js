import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'nav',
  role: 'navigation',
  classNames: [ 'navbar', 'navbar-default' ],
  attributeBindings: [ 'role' ]
});
