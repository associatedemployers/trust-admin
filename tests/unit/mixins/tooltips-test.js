import Ember from 'ember';
import TooltipsMixin from 'trust-admin/mixins/tooltips';

module('TooltipsMixin');

// Replace this with your real tests.
test('it works', function() {
  var TooltipsObject = Ember.Object.extend(TooltipsMixin);
  var subject = TooltipsObject.create();
  ok(subject);
});
