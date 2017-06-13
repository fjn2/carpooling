const controllerName = 'sideMenuCtrl';

module.exports = (mod) => {
  mod.controller(controllerName, ['$mdSidenav', '$log', '$state', 'loadingSvc', 'loginSvc', '$scope', function ($mdSidenav, $log, $state, loadingSvc, loginSvc, $scope) {
    this.toggleMenu = () => {
      $mdSidenav('sideNavMenu')
        .toggle()
        .then(() => {
          $log.debug('toggle sideNavMenu is done');
        });
    };
    this.goTo = (state) => {
      $state.go(state);
      this.setTitleName(state);
      this.toggleMenu();
    };
    this.logout = () => {
      loginSvc.logout();
      this.goTo('login');
    };
    this.state = $state;
    this.user = loginSvc.getCurrentUser();
    this.loading = loadingSvc;

    this.setTitleName = (nextStateName) => {
      switch (nextStateName) {
        case 'app.carPoolList':
          this.sectionName = 'Viajes';
          break;
        case 'app.myJourneys':
          this.sectionName = 'Mis viajes';
          break;
        case 'app.carPoolCreate':
          this.sectionName = 'Nuevo viaje';
          break;
        case 'app.user':
          this.sectionName = 'Perfil';
          break;
        default:
          this.sectionName = 'Car pool app';
          break;
      }
    };

    this.setTitleName($state.current.name);
  }]);
  return controllerName;
};
