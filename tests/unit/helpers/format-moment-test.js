import {
  formatMoment
} from 'trust-admin/helpers/format-moment';

module('FormatMomentHelper');

test('it formats dates', function() {
  var d = moment('2012-12-12', 'YYYY-MM-DD').toDate();
  var result = formatMoment(d, 'YYYY/MM/DD');

  equal(result, '2012/12/12');
});

test('it formats dates with hours', function() {
  var d = moment('2012-12-12 22:22:22', 'YYYY-MM-DD HH:mm:ss').toDate();
  var result = formatMoment(d, 'YYYY/MM/DD hh:mma');

  equal(result, '2012/12/12 10:22pm');
});

test('it displays invalid date for non date objects', function() {
  var d = 'Not a date really';
  var result = formatMoment(d, 'YYYY/MM/DD');

  equal(result, 'Invalid date');
});
