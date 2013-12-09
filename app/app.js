var _ = window._ = require('underscore');
require('angular/angular');
require('angular-route/angular-route');
require('angular-underscore/angular-underscore');

var fs = require('fs');
var Pouch = require('pouchdb');

var ng = module.exports = angular.module('app', ['ngRoute', 'angular-underscore']);

// templates
var mainHtml = fs.readFileSync(__dirname + '/templates/main.html');

// controllers
require('./controllers/main.js')(ng);

// config
ng.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainCtrl',
      template: mainHtml
    });
});

// pouch
ng.factory('db', function() {
  var db = new Pouch('uglychat');
  db.replicate.to('http://localhost:5984/uglychat', { continuous: true });
  db.replicate.from('http://localhost:5984/uglychat', {continuous: true });
  return db;
});

