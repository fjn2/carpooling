const controllerName = 'myJourneysCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$mdDialog', 'carPolSvc', 'loadingSvc', '$state', function ($mdDialog, carPolSvc, loadingSvc, $state) {
    this.journeys = [];

    this.removeToTrip = (ev) => {
      // Appending dialog to document.body to cover sidenav in docs app
      const confirm = $mdDialog.confirm()
        .title('Estas por bajarte de un viaje')
        .textContent('¿Deseas continuar?')
        .ariaLabel('Conrifmar')
        .targetEvent(ev)
        .ok('Confirmar')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(() => {
        // confirm
      }, () => {
        // do nothing
      });
    };
    this.editTrip = (journey) => {
      $state.go('app.carPoolCreate', {
        journey,
      });
    };
    loadingSvc.show();
    carPolSvc.get().then((journey) => {
      this.journeys = this.journeys.concat(journey);
    }).finally(() => {
      loadingSvc.hide();
    });
  }]);
  return controllerName;
};