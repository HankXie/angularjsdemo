'use strict';
// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'myApp.filters',
    'myApp.services',
    'myApp.directives'])
    .constant('Conf', {
        DEBUG: true,
        API: {
            MYHOST:'http://192.168.1.109:8888/springblog/api'
        }
    })
    .config(['$routeProvider', function($routeProvider,$locationProvider) {
    $routeProvider.when('/login', {templateUrl: 'templates/login.html', controller: LoginCtrl});
    $routeProvider.when('/home', {templateUrl: 'templates/lucky.html', controller: HomeCtrl});
    $routeProvider.when('/detail', {templateUrl: 'templates/detail.html', controller: DetailCtrl});
    $routeProvider.otherwise({redirectTo: '/login'});
  }]);
