const controllerName = 'loginCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$state', 'loginSvc', '$mdDialog', function ($state, loginSvc, $mdDialog) {
    this.login = () => {
      if (this.code) {
        loginSvc.validateCode(this.code).then(() => {
          const alert = $mdDialog.alert()
            .title('¡La validación se realizó de manera correcta!')
            .textContent('Te damos la bienvenida al grupo de carpool de Abril')
            .ariaLabel('Aceptar')
            .ok('Aceptar');

          loginSvc.checkForloggedUser().then(() => {
            $mdDialog.show(alert).then(() => {
              $state.go('app.carPoolList', {}, {
                location: 'replace'
              });
            });
          });
        }, () => {
          // we can't cerficate the code
          const alert = $mdDialog.alert()
            .title('No pudimos corroborar tu código')
            .textContent('Verificá que tus datos sean correctos. Si necesitás ayuda contactanos a admin@pirpul.com')
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
          .title('Te enviamos el código por mail')
          .ariaLabel('Aceptar')
          .ok('Aceptar');

        $mdDialog.show(alert);
      });
    };
  }]);
  return controllerName;
};
