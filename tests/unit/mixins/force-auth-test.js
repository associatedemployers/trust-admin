import Ember from 'ember';
import ForceAuthMixin from 'trust-admin/mixins/force-auth';

module('ForceAuthMixin');

// Replace this with your real tests.
test('it works', function() {
  var ForceAuthObject = Ember.Object.extend(ForceAuthMixin);
  var subject = ForceAuthObject.create();
  ok(subject);
});
