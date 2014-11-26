import Ember from 'ember';
import ResourceFiltersMixin from 'trust-admin/mixins/resource-filters';

module('ResourceFiltersMixin');

// Replace this with your real tests.
test('it works', function() {
  var ResourceFiltersObject = Ember.Object.extend(ResourceFiltersMixin);
  var subject = ResourceFiltersObject.create();
  ok(subject);
});
