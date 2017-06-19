const controllerName = 'carPoolListCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$mdDialog', 'carPolSvc', 'loadingSvc', '$state', function ($mdDialog, carPolSvc, loadingSvc, $state) {
    this.journeys = [];

    this.addToTrip = (journey) => {
      // Appending dialog to document.body to cover sidenav in docs app
      const confirm = $mdDialog.confirm()
        .title('Estas por agregarte a un viaje')
        .textContent('¿Deseas continuar?')
        .ariaLabel('Conrifmar')
        .ok('Confirmar')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(() => {
        // confirm
        loadingSvc.show();
        carPolSvc.addToJourney(journey).then(() => {
          journey.added = true;
          journey.free_seats -= 1;
        }).finally(() => {
          loadingSvc.hide();
        });
      }, () => {
        // do nothing
      });
    };
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
          journey.added = false;
          journey.free_seats += 1;
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
    let refModal;
    this.showReferences = () => {
      refModal = $mdDialog.show({
        templateUrl: '/references.html',
        controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
          $scope.closeReferences = () => {
            console.log('cerrando');
            $mdDialog.hide();
          };
        }],
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
