/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
    Funnel = require('broccoli-funnel'),
    fs = require('fs-extra'),
    vendorDir = JSON.parse(fs.readFileSync('./.bowerrc')).directory + '/';

var bowerIncludes = [
  'font-awesome/css/font-awesome.css',
  'animate.css/animate.css',
  'nprogress/nprogress.css',
  'c3js-chart/c3.css',
  'd3/d3.js',
  'velocity/velocity.js',
  'bootstrap/dist/js/bootstrap.min.js',
  'moment/moment.js',
  'bootstrap.growl/bootstrap-growl.js',
  'nprogress/nprogress.js',
  'c3js-chart/c3.js',
  'typeahead.js/dist/typeahead.jquery.js'
];

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  var fonts = new Funnel(vendorDir + 'font-awesome', {
    srcDir: '/fonts',
    include: ['*.*'],
    destDir: '/assets/fonts'
  });

  bowerIncludes.forEach(path => app.import(vendorDir + path));

  return app.toTree(fonts);
};
