const controllerName = 'sideMenuCtrl';

module.exports = (mod) => {
  mod.controller(controllerName, ['$scope', '$mdSidenav', '$log', '$state', function($scope, $mdSidenav, $log, $state) {
    this.toggleMenu = () => {
      $mdSidenav('sideNavMenu')
        .toggle()
        .then(() => {
          $log.debug('toggle sideNavMenu is done');
        });
    };
    this.goTo = (state) => {
      $state.go(state);
    };
  }]);
  return controllerName;
};
