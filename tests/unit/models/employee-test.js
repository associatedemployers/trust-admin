import { test, moduleForModel } from 'ember-qunit';

moduleForModel('employee', 'Employee', {
  // Specify the other units that are required for this test.
  needs: ['model:contact-method', 'model:beneficiary', 'model:note', 'model:company']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});
