const angular = require('angular');

const moduleName = 'sideMenu';

const mod = angular.module(moduleName, []);

require('./styles/main.scss');

require('./services/loadingSvc.js')(mod);
require('./services/deviceIdInterceptor.js')(mod);

module.exports = () => {
  mod.config(['$stateProvider', ($stateProvider) => {
    $stateProvider.state('app', {
      template: require('./views/main.html'),
      controller: 'sideMenuCtrl',
      controllerAs: 'vm',
    });
  }]);

  mod.run(() => {

  });

  require('./controllers/sideMenuCtrl.js')(mod);

  return mod.name;
};
