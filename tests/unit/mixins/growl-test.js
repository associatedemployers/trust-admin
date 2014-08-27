import Ember from 'ember';
import GrowlMixin from 'trust-admin/mixins/growl';

module('GrowlMixin');

// Replace this with your real tests.
test('it works', function() {
  var GrowlObject = Ember.Object.extend(GrowlMixin);
  var subject = GrowlObject.create();
  ok(subject);
});
