const controllerName = 'sideMenuCtrl';

module.exports = (mod) => {
  mod.controller(controllerName, ['$mdSidenav', '$log', '$state', 'loadingSvc', 'loginSvc', function ($mdSidenav, $log, $state, loadingSvc, loginSvc) {
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

    this.user = loginSvc.getCurrentUser();
    this.loading = loadingSvc;
  }]);
  return controllerName;
};
