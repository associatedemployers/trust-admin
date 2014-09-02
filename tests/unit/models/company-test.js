import { test, moduleForModel } from 'ember-qunit';

moduleForModel('company', 'Company', {
  needs: ['model:medical-rate', 'model:employee']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});
