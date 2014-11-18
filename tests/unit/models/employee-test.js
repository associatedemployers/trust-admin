import { test, moduleForModel } from 'ember-qunit';

moduleForModel('employee', 'Employee', {
  // Specify the other units that are required for this test.
  needs: ['model:company', 'model:medical-rate', 'model:employee', 'model:contact-method', 'model:beneficiary', 'model:note', 'model:history-event', 'model:medical-plan', 'model:dependent', 'model:file', 'model:dental-rate', 'model:vision-rate', 'model:life-rate', 'model:history-event']
});

test('it exists', function() {
  // var model = this.subject();
  // var store = this.store();
  // ok(model);
  expect(0);
});
