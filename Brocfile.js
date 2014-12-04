/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

/* Ember Data Adapter */
app.import('bower_components/ember-localstorage-adapter/localstorage_adapter.js');

/* Vendor CSS */
app.import('bower_components/font-awesome/css/font-awesome.css'); // Font Awesome Icons
app.import('bower_components/animate.css/animate.css');           // Animate.css
app.import('bower_components/nprogress/nprogress.css');           // NProgess CSS
app.import('bower_components/c3js-chart/c3.css');                 // c3.js CSS

/* Vendor JS */
app.import('bower_components/d3/d3.js');                              // d3.js
app.import('bower_components/velocity/velocity.js');                  // Velocity.js
app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');    // Bootstrap JS
app.import('bower_components/moment/moment.js');                      // Moment.js
app.import('bower_components/bootstrap.growl/bootstrap-growl.js');    // Bootstrap Growl Notifications JS
app.import('bower_components/nprogress/nprogress.js');                // NProgress JS
app.import('bower_components/c3js-chart/c3.js');                      // c3.js
app.import('bower_components/typeahead.js/dist/typeahead.jquery.js'); // Twitter Typeahead.js

module.exports = app.toTree();
