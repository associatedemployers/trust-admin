import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lists/medical-plan-item', 'Integration | Component | lists/medical plan item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lists/medical-plan-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#lists/medical-plan-item}}
      template block text
    {{/lists/medical-plan-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
