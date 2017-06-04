const angular = require('angular');

const moduleName = 'carPool';

const mod = angular.module(moduleName, []);

require('./controllers/carPoolListCtrl.js')(mod);

mod.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state('app.carPoolList', {
    url: '/carPoolList',
    template: require('./views/carPoolList.html'),
    controller: 'carPoolListCtrl',
    controllerAs: 'vm',
  });
}]);

module.exports = () => mod.name;
