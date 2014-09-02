import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

var preconfig = {
  pages:      50,
  page:       1,
  maxButtons: 8
};

var configCases = [
  {
    pages:      100,
    page:       1,
    maxButtons: 8
  },
  {
    page:       7,
    maxButtons: 10
  },
  {
    pages: 5,
    page: 1,
    maxButtons: 10
  }
];

moduleForComponent('resource-pagination', 'ResourcePaginationComponent', {

});

test('it renders', function () {
  expect( 2 );

  var component = this.subject( preconfig );

  equal(component.state, 'preRender');

  // Appends the component to the page
  this.append();
  equal(component.state, 'inDOM');
});

test('renderList tests', function () {
  var component = this.subject( preconfig );

  Ember.run(function () {
    var renderList = component.get('renderList');

    ok( renderList, 'renderList exists' );
    ok( typeof renderList === 'object', 'renderList is an array' );
  });

  Ember.run(function () {
    component.setProperties( configCases[0] );

    Ember.run.next(function () {
      var rl = component.get('renderList');

      // Assertions
      ok( rl[ 0 ].active, 'Page 1 is active' );
      equal( rl[ 0 ].n, 1, 'rl[0].n is 1' );
      equal( rl.length, configCases[ 0 ].maxButtons, 'renderList has same length as maxButtons' );
      equal( component.get('onFirstPage'), true, 'On First Page' );
      // end Assertions

      component.setProperties( configCases[1] );

      Ember.run.next(function () {
        var rl = component.get('renderList');

        // Assertions
        equal( rl[ 0 ].n, 2, 'Pages shift when page > maxButtons / 2' );
        equal( component.get('onFirstPage'), false, 'Not On First Page' );
        // end Assertions

        component.setProperties( configCases[2] );

        Ember.run.next(function () {
          // Out here in edgerton
          var rl = component.get('renderList');

          // Assertions
          ok( rl[ 0 ].active, 'Page 1 is active' );
          equal( rl[ 0 ].n, 1, 'rl[0].n is 1' );
          equal( rl.length, 5, 'renderList length is 5 when given pages: 5, maxButtons: 10' );
          equal( component.get('onFirstPage'), true, 'On First Page' );
          // end Assertions
        });
      });
    });
  });
});
