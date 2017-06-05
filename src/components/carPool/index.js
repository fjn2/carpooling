const angular = require('angular');

const moduleName = 'carPool';

const mod = angular.module(moduleName, []);

require('./styles/carPool.scss');
require('./controllers/carPoolListCtrl.js')(mod);
require('./controllers/carPoolCreateCtrl.js')(mod);

mod.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state('app.carPoolList', {
    url: '/carPoolList',
    template: require('./views/carPoolList.html'),
    controller: 'carPoolListCtrl',
    controllerAs: 'vm',
  });
  $stateProvider.state('app.carPoolCreate', {
    url: '/carPoolList',
    template: require('./views/carPoolCreate.html'),
    controller: 'carPoolCreateCtrl',
    controllerAs: 'vm',
  });
}]);

module.exports = () => mod.name;
