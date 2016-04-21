import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('employee/plan-table', 'Integration | Component | employee/plan table', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{employee/plan-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#employee/plan-table}}
      template block text
    {{/employee/plan-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
