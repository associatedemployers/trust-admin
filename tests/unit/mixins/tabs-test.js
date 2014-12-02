import Ember from 'ember';
import TabsMixin from 'trust-admin/mixins/tabs';

module('TabsMixin');

// Replace this with your real tests.
test('it works', function() {
  var TabsObject = Ember.Object.extend(TabsMixin);
  var subject = TabsObject.create();
  ok(subject);
});
