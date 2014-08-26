import Ember from 'ember';
import ResourcePaginatorMixin from 'trust-admin/mixins/resource-paginator';

module('ResourcePaginatorMixin');

// Replace this with your real tests.
test('it works', function() {
  var ResourcePaginatorObject = Ember.Object.extend(ResourcePaginatorMixin);
  var subject = ResourcePaginatorObject.create();
  ok(subject);
});
