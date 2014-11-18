import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('life-rate', 'LifeRate', {
  needs: ['model:company', 'model:medical-rate', 'model:employee', 'model:contact-method', 'model:beneficiary', 'model:note', 'model:history-event', 'model:medical-plan', 'model:dependent', 'model:file', 'model:dental-rate', 'model:vision-rate', 'model:life-rate']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
