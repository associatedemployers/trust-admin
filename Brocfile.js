/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

/* Vendor CSS */
app.import('vendor/font-awesome/css/font-awesome.css');  // Font Awesome Icons
app.import('vendor/animate.css/animate.css');            // Animate.css
app.import('vendor/nprogress/nprogress.css');            // NProgess CSS
app.import('vendor/vis/dist/vis.css');                   // vis CSS

/* Vendor JS */
app.import('vendor/bootstrap/dist/js/bootstrap.min.js'); // Bootstrap JS
app.import('vendor/moment/moment.js');                   // Moment.js
app.import('vendor/bootstrap.growl/bootstrap-growl.js'); // Bootstrap Growl Notifications JS
app.import('vendor/nprogress/nprogress.js');             // NProgress JS
app.import('vendor/vis/dist/vis.js');                    // vis JS

module.exports = app.toTree();
