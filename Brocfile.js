/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

/* Vendor CSS */
app.import('bower_components/font-awesome/css/font-awesome.css'); // Font Awesome Icons
app.import('bower_components/animate.css/animate.css');           // Animate.css
app.import('bower_components/nprogress/nprogress.css');           // NProgess CSS
app.import('bower_components/vis/dist/vis.css');                  // vis CSS

/* Vendor JS */
app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');    // Bootstrap JS
app.import('bower_components/moment/moment.js');                      // Moment.js
app.import('bower_components/bootstrap.growl/bootstrap-growl.js');    // Bootstrap Growl Notifications JS
app.import('bower_components/nprogress/nprogress.js');                // NProgress JS
app.import('bower_components/vis/dist/vis.js');                       // vis JS
app.import('bower_components/typeahead.js/dist/typeahead.jquery.js'); // Twitter Typeahead.js

module.exports = app.toTree();
