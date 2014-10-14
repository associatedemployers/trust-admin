import {
  timeAgo
} from 'trust-admin/helpers/time-ago';

module('TimeAgoHelper');

// Replace this with your real tests.
test('it displays timeago', function () {
  var result = timeAgo( new Date() );
  equal(result, 'a few seconds ago');
});
