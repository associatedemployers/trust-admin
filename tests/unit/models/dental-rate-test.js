import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('dental-rate', 'DentalRate', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
