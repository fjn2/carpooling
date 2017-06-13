const angular = require('angular');

const moduleName = 'settings';

const mod = angular.module(moduleName, []);

require('./controllers/userDetailCtrl.js')(mod);

require('./services/userSvc.js')(mod);

mod.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state('app.user', {
    url: '/user',
    template: require('./views/userDetail.html'),
    controller: 'userDetailCtrl',
    controllerAs: 'vm',
  });
  $stateProvider.state('createUser', {
    url: '/user',
    template: require('./views/userDetail.html'),
    controller: 'userDetailCtrl',
    controllerAs: 'vm',
  });
}]);

module.exports = () => mod.name;
