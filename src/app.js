require('angular');
require('angular-ui-router/release/ui-router-angularjs.min.js');
require('angular-material/angular-material.min.js');
require('angular-aria/angular-aria.min.js');
require('angular-animate/angular-animate.min.js');

require('angular-material/angular-material.min.css');

require('font-awesome/css/font-awesome.css');

const angular = require('angular');
const app = angular.module('app', [
  'ui.router',
  'ngMaterial',
  require('./components/login')(),
  require('./components/sideMenu')(),
  require('./components/carPool')(),
  require('./components/settings')(),
]);

app.config(['$urlRouterProvider', ($urlRouterProvider) => {
  $urlRouterProvider.otherwise('/carPoolList');
}]);
app.run(['$state', ($state) => {
  $state.go('app.carPool');
}]);

// var app = {
//     // Application Constructor
//     initialize: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//     },

//     // deviceready Event Handler
//     //
//     // Bind any cordova events here. Common events are:
//     // 'pause', 'resume', etc.
//     onDeviceReady: function() {
//         this.receivedEvent('deviceready');
//     },

//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };

// app.initialize();
