const controllerName = 'carPoolCreateCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$mdDialog', '$stateParams', 'carPolSvc', '$scope', 'loadingSvc', function ($mdDialog, $stateParams, carPolSvc, $scope, loadingSvc) {
    this.minDate = new Date();
    this.time = new Date();
    this.maxDate = new Date(
      this.minDate.getFullYear(),
      this.minDate.getMonth(),
      this.minDate.getDate() + 10,
      );

    this.date_time = new Date();

    this.newEntry = !$stateParams.journey;

    if (!this.newEntry) {
      Object.assign(this, {
        car_identification: $stateParams.journey.car_identification,
        description: $stateParams.journey.description,
        from_to: $stateParams.journey.from_top,
        total_seats: $stateParams.journey.total_seats,
        date_time: new Date($stateParams.journey.date_time),
        _id: $stateParams.journey._id,
      });
    }

    this.save = () => {
      if (this.newEntry) {
        const confirm = $mdDialog.confirm()
          .title('Estas por crear un nuevo viaje')
          .textContent('¿Confirma la operación?')
          .ariaLabel('Conrifmar')
          .ok('Confirmar')
          .cancel('Cancelar');
        $mdDialog.show(confirm).then(() => {
          loadingSvc.show();

          carPolSvc.saveJourney(this).finally(() => {
            loadingSvc.hide();
          });
        }, () => {
          // do nothing
        });
      } else {
        const confirm = $mdDialog.confirm()
          .title('Estas por modificar un viaje')
          .textContent('¿Confirma la operación?')
          .ariaLabel('Conrifmar')
          .ok('Confirmar')
          .cancel('Cancelar');
        $mdDialog.show(confirm).then(() => {
          loadingSvc.show();

          carPolSvc.updateJourney(this).finally(() => {
            loadingSvc.hide();
          });
        }, () => {
          // do nothing
        });
      }
    };
    this.delete = () => {
      const confirm = $mdDialog.confirm()
        .title('Estas por eliminar este viaje')
        .textContent('¿Confirma la operación?')
        .ariaLabel('Conrifmar')
        .ok('Confirmar')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(() => {
        loadingSvc.show();

        carPolSvc.deleteJourney(this).finally(() => {
          loadingSvc.hide();
        });
      }, () => {
        // do nothing
      });
    };

    $scope.$watch('vm.from_to', () => {
      if (this.from_to === 'FROM') {
        this.descriptionLabel = '¿A donde vas?';
      } else {
        this.descriptionLabel = '¿Desde donde venis?';
      }
    });
  }]);
  return controllerName;
};
