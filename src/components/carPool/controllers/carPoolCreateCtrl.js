const controllerName = 'carPoolCreateCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$mdDialog', '$stateParams', 'carPolSvc', '$scope', 'loadingSvc', '$state', function ($mdDialog, $stateParams, carPolSvc, $scope, loadingSvc, $state) {
    this.minDate = new Date();
    this.time = new Date();
    this.maxDate = new Date(
      this.minDate.getFullYear(),
      this.minDate.getMonth(),
      this.minDate.getDate() + 10
      );

    this.date_time = new Date();
    this.from_to = 'FROM';
    this.flexible_time = false;

    this.newEntry = !$stateParams.journey;

    if (!this.newEntry) {
      Object.assign(this, {
        car_identification: $stateParams.journey.car_identification,
        description: $stateParams.journey.description,
        from_to: $stateParams.journey.from_to,
        flexible_time: $stateParams.journey.flexible_time,
        total_seats: $stateParams.journey.total_seats,
        date_time: new Date($stateParams.journey.date_time),
        _id: $stateParams.journey._id
      });
    }

    this.save = () => {
      if (this.newEntry) {
        const confirm = $mdDialog.confirm()
          .title('Estás por crear un nuevo viaje')
          .textContent('')
          .ariaLabel('Conrifmar')
          .ok('Confirmar')
          .cancel('Cancelar');
        $mdDialog.show(confirm).then(() => {
          loadingSvc.show();

          carPolSvc.saveJourney(this).then(() => {
            const alert = $mdDialog.alert()
              .title('Operación exitosa')
              .textContent('Se creó el viaje de forma exitosa')
              .ariaLabel('Aceptar')
              .ok('Aceptar');

            $mdDialog.show(alert).then(() => {
              $state.go('app.carPoolList');
            });
          }).finally(() => {
            loadingSvc.hide();
          });
        }, () => {
          // do nothing
        });
      } else {
        const confirm = $mdDialog.confirm()
          .title('Estás por modificar un viaje')
          .ariaLabel('Conrifmar')
          .ok('Confirmar')
          .cancel('Cancelar');
        $mdDialog.show(confirm).then(() => {
          loadingSvc.show();

          carPolSvc.updateJourney(this).then(() => {
            const alert = $mdDialog.alert()
              .title('Operación exitosa')
              .textContent('Se modificó el viaje de forma exitosa')
              .ariaLabel('Aceptar')
              .ok('Aceptar');

            $mdDialog.show(alert).then(() => {
              $state.go('app.carPoolList');
            });
          }).finally(() => {
            loadingSvc.hide();
          });
        }, () => {
          // do nothing
        });
      }
    };
    this.delete = () => {
      const confirm = $mdDialog.confirm()
        .title('Estás por eliminar este viaje')
        .ariaLabel('Conrifmar')
        .ok('Confirmar')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(() => {
        loadingSvc.show();

        carPolSvc.deleteJourney(this).then(() => {
          $state.go('app.carPoolList');
        }).finally(() => {
          loadingSvc.hide();
        });
      }, () => {
        // do nothing
      });
    };

    $scope.$watch('vm.from_to', () => {
      if (this.from_to === 'FROM') {
        this.descriptionLabel = '¿A dónde vas? ¿Por dónde?';
      } else {
        this.descriptionLabel = '¿Desde dónde venís? ¿Por dónde?';
      }
    });
  }]);
  return controllerName;
};
