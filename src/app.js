require('angular');
require('angular-ui-router/release/ui-router-angularjs.min.js');
require('angular-material/angular-material.min.js');
require('angular-aria/angular-aria.min.js');
require('angular-animate/angular-animate.min.js');

require('angular-material/angular-material.min.css');

require('font-awesome/css/font-awesome.css');

const applicationStartTime = new Date();
const splashScreenTime = 2000;
const testDeviceId = '12345';

const angular = require('angular');
const app = angular.module('app', [
  'ui.router',
  'ngMaterial',
  require('./components/login')(),
  require('./components/sideMenu')(),
  require('./components/carPool')(),
  require('./components/settings')(),
  require('./components/user')()
]);

app.constant('configuration', {
  host: 'http://54.173.70.135:8081',
  testDeviceId
});

app.config(['$urlRouterProvider', ($urlRouterProvider) => {
  $urlRouterProvider.otherwise('/login');
}]);
app.run(['$state', 'loginSvc', '$mdDialog', '$window', ($state, loginSvc, $mdDialog, $window) => {
  loginSvc.checkForloggedUser().then(() => {
    $state.go('app.carPoolList', {}, {
      location: 'replace'
    });
  }, (err) => {
    if (err.status === -1) {
      // there is no internet conection
      const alert = $mdDialog.alert()
        .title('No pudimos conectarnos con el servidor')
        .textContent('Vuelva a intentarlo más tarde')
        .ariaLabel('Reintentar')
        .ok('Reintentar');

      $mdDialog.show(alert).then(() => {
        $window.location.reload();
      });
    }
    $state.go('login');
  }).finally(() => {
    if (window.navigator.splashscreen) {
      setTimeout(() => {
        console.log('Hiding SplashScreen');
        window.navigator.splashscreen.hide();
      }, splashScreenTime - (new Date() - applicationStartTime));
    } else {
      console.log('SplashScreen plugin doesn\' exists');
    }
  });
}]);

function onDeviceReady() {
  console.log('deviceready');
  app.constant('device', {
    uuid: (typeof cordova !== 'undefined') ? device.uuid : testDeviceId
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
