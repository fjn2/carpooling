const angular = require('angular');

const moduleName = 'settings';

const mod = angular.module(moduleName, []);

require('./controllers/settingsCtrl.js')(mod);

mod.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state('app.settings', {
    url: '/settings',
    template: require('./views/settings.html'),
    controller: 'settingsCtrl',
    controllerAs: 'vm'
  });
}]);

module.exports = () => mod.name;
