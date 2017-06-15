const controllerName = 'myJourneysCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$mdDialog', 'carPolSvc', 'loadingSvc', '$state', function ($mdDialog, carPolSvc, loadingSvc, $state) {
    this.journeys = [];

    this.removeToTrip = (journey) => {
      // Appending dialog to document.body to cover sidenav in docs app
      const confirm = $mdDialog.confirm()
        .title('Estas por bajarte de un viaje')
        .textContent('¿Deseas continuar?')
        .ariaLabel('Conrifmar')
        .ok('Confirmar')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(() => {
        // confirm
        loadingSvc.show();
        carPolSvc.removeToJourney(journey).then(() => {
          if (~this.journeys.indexOf(journey)) {
            this.journeys.splice(this.journeys.indexOf(journey), 1);
          }
        }).finally(() => {
          loadingSvc.hide();
        });
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
    carPolSvc.getMyJourneys().then((journey) => {
      this.journeys = this.journeys.concat(journey);
    }).finally(() => {
      loadingSvc.hide();
    });
  }]);
  return controllerName;
};
