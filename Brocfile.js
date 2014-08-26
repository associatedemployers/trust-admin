/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

/* Vendor CSS */
app.import('vendor/font-awesome/css/font-awesome.css');

/* Vendor JS */
app.import('vendor/bootstrap/dist/js/bootstrap.min.js');
app.import('vendor/moment/moment.js');

module.exports = app.toTree();
