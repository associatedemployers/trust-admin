import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('resource-pagination', 'ResourcePaginationComponent');

test('it renders', function () {
  expect(2);

  // Creates the component instance
  var component = this.subject({
    pages: 50,
    page:  1,
    maxButtons: 8
  });

  equal(component.state, 'preRender');

  // Appends the component to the page
  this.append();
  equal(component.state, 'inDOM');

  test('it creates a renderList array', function () {
    expect(2);

    Ember.run(function () {
      var a = component.get('renderList');

      ok( a, "renderList exists" );
      ok( typeof a === 'object', "renderList is an array" );
    });
  });
});
