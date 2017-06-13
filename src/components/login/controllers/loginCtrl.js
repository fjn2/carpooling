const controllerName = 'loginCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$state', 'loginSvc', '$mdDialog', function ($state, loginSvc, $mdDialog) {
    this.login = () => {
      if (this.code) {
        loginSvc.validateCode(this.code).then(() => {
          $state.go('app');
        }, () => {
          // we can't cerficate the code
          const alert = $mdDialog.alert()
            .title('No pudimos verificar el código')
            .textContent('El código que ingresaste no es correcto')
            .ariaLabel('Aceptar')
            .ok('Aceptar');

          $mdDialog.show(alert);
        });
      }
    };
    this.requestAccess = () => {
      $state.go('createUser');
    };
  }]);
  return controllerName;
};
