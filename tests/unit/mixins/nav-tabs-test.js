import Ember from 'ember';
import NavTabsMixin from 'trust-admin/mixins/nav-tabs';

module('NavTabsMixin');

// Replace this with your real tests.
test('it works', function() {
  var NavTabsObject = Ember.Object.extend(NavTabsMixin);
  var subject = NavTabsObject.create();
  ok(subject);
});
