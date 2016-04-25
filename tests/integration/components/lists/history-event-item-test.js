import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lists/history-event-item', 'Integration | Component | lists/history event item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lists/history-event-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#lists/history-event-item}}
      template block text
    {{/lists/history-event-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
