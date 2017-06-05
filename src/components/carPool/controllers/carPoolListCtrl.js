const controllerName = 'carPoolListCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$mdDialog', function ($mdDialog) {
    this.carTrips = [];
    for (let i = 0; i < 30; i += 1) {
      this.carTrips.push({
        when: '5 / 12 / 2017 18:00 (en 15\')',
        destination: 'Quilmes',
        availablePlaces: 3,
        driverName: 'Katana',
        added: !!Math.round(Math.random()),
        admin: !!Math.round(Math.random()),
      });
    }
    this.addToTrip = (ev) => {
      // Appending dialog to document.body to cover sidenav in docs app
      const confirm = $mdDialog.confirm()
        .title('Estas por agregarte a un viaje')
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
  }]);
  return controllerName;
};
