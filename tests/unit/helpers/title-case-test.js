import {
  titleCase
} from 'trust-admin/helpers/title-case';

module('TitleCaseHelper');

// Replace this with your real tests.
test('it title cases', function() {
  var result = titleCase('hello world');
  equal(result, 'Hello World');
});
