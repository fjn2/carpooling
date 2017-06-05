const controllerName = 'carPoolCreateCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$mdDialog', function ($mdDialog) {
    this.minDate = new Date();
    this.time = new Date();
    this.maxDate = new Date(
      this.minDate.getFullYear(),
      this.minDate.getMonth(),
      this.minDate.getDate() + 10,
      );
    this.showConfirm = (ev) => {
      // Appending dialog to document.body to cover sidenav in docs app
      const confirm = $mdDialog.confirm()
        .title('Estas por eliminar este viaje')
        .textContent('¿Confirma la operación?')
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
