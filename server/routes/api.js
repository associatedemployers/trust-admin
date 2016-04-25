var express = require('express'),
    httpProxy = require('http-proxy'),
    apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', function( err, req, res ) {
  res.end();
});

module.exports = function(app) {
  app.all('/api/*', function ( req, res ) {
    apiProxy.web(req, res, { target: 'http://localhost:3000' });
  });
};
