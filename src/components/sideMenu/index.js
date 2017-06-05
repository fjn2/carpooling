const angular = require('angular');

const moduleName = 'sideMenu';


module.exports = () => {
  const mod = angular.module(moduleName, []);

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
