const controllerName = 'sideMenuCtrl';

module.exports = (mod) => {
  mod.controller(controllerName, ['$mdSidenav', '$log', '$state', function ($mdSidenav, $log, $state) {
    this.toggleMenu = () => {
      $mdSidenav('sideNavMenu')
        .toggle()
        .then(() => {
          $log.debug('toggle sideNavMenu is done');
        });
    };
    this.goTo = (state) => {
      $state.go(state);
      this.toggleMenu();
    };
  }]);
  return controllerName;
};
