const angular = require('angular');

const moduleName = 'sideMenu';

const mod = angular.module(moduleName, []);

require('./styles/main.scss');

require('./services/loadingSvc.js')(mod);
require('./services/deviceIdInterceptor.js')(mod);

require('./controllers/sideMenuCtrl.js')(mod);

module.exports = () => {
  mod.config(['$stateProvider', ($stateProvider) => {
    $stateProvider.state('app', {
      template: require('./views/main.html'),
      controller: 'sideMenuCtrl',
      controllerAs: 'vm',
    });
    $stateProvider.state('app.contactUs', {
      template: require('./views/contactUs.html'),
    });
  }]);


  return mod.name;
};
