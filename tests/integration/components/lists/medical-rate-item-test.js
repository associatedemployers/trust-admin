import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lists/medical-rate-item', 'Integration | Component | lists/medical rate item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lists/medical-rate-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#lists/medical-rate-item}}
      template block text
    {{/lists/medical-rate-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
