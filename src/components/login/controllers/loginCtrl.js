const controllerName = 'loginCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$state', 'loginSvc', '$mdDialog', function ($state, loginSvc, $mdDialog) {
    this.login = () => {
      if (this.code) {
        loginSvc.validateCode(this.code).then(() => {
          const alert = $mdDialog.alert()
            .title('La validación se realizó de manera correcta')
            .textContent('The damos la bienvenida al sistema de carpooling de Abril')
            .ariaLabel('Aceptar')
            .ok('Aceptar');

          loginSvc.checkForloggedUser().then(() => {
            $mdDialog.show(alert).then(() => {
              $state.go('app');
            });
          });

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
    this.sendCodeAgain = () => {
      loginSvc.sendCodeAgain().then(() => {
        const alert = $mdDialog.alert()
          .title('Te enviamos el codigo por mail')
          .ariaLabel('Aceptar')
          .ok('Aceptar');

        $mdDialog.show(alert);
      });
    };
  }]);
  return controllerName;
};
