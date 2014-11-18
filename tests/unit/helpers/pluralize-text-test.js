import {
  pluralizeText
} from 'trust-admin/helpers/pluralize-text';

module('PluralizeTextHelper');

test('it pluralizes text', function() {
  var result = pluralizeText('test');

  equal(result, 'tests');
});
