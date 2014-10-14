import {
  shortenText
} from 'trust-admin/helpers/shorten-text';

module('ShortenTextHelper');

test('shortens text', function () {
  var result = shortenText('123456789', 5);
  equal(result, '12...');
});
