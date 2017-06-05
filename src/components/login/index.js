const angular = require('angular');

const moduleName = 'login';

const mod = angular.module(moduleName, []);

require('./styles/login.scss');
require('./controllers/loginCtrl.js')(mod);

mod.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state('login', {
    url: '/settings',
    template: require('./views/login.html'),
    controller: 'loginCtrl',
    controllerAs: 'vm',
  });
}]);

module.exports = () => mod.name;
