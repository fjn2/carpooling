require('angular');
require('angular-ui-router/release/ui-router-angularjs.min.js');
require('angular-material/angular-material.min.js');
require('angular-aria/angular-aria.min.js');
require('angular-animate/angular-animate.min.js');

require('angular-material/angular-material.min.css');

require('font-awesome/css/font-awesome.css');

const applicationStartTime = new Date();
const splashScreenTime = 2000;

const angular = require('angular');
const app = angular.module('app', [
  'ui.router',
  'ngMaterial',
  require('./components/login')(),
  require('./components/sideMenu')(),
  require('./components/carPool')(),
  require('./components/settings')(),
  require('./components/user')(),
]);

app.constant('configuration', {
  host: 'http://54.173.70.135:8081',
  testDeviceId: '12345',
});

app.config(['$urlRouterProvider', ($urlRouterProvider) => {
  $urlRouterProvider.otherwise('/login');
}]);
app.run(['$state', 'loginSvc', ($state, loginSvc) => {
  loginSvc.checkForloggedUser().then(() => {
    $state.go('app.carPoolList');
  }, () => {
    $state.go('login');
  }).finally(() => {
    if (window.navigator.splashscreen) {
      setTimeout(() => {
        window.navigator.splashscreen.hide();
      }, splashScreenTime - new Date() - applicationStartTime);
    } else {
      console.log('SplashScreen plugin doesn\' exists');
    }
  });
}]);

function onDeviceReady() {
  console.log('deviceready');
  app.constant('device', {
    uuid: (typeof cordova !== 'undefined') ? device.uuid : '12345',
    // uuid: 'sdfsdfsdf',
  });
  angular.bootstrap(window.document, ['app']);
}

window.document.addEventListener('deviceready', onDeviceReady, false);

setTimeout(() => {
  if (typeof cordova === 'undefined') {
    onDeviceReady();
  }
});
