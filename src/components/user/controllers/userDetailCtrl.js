const controllerName = 'userDetailCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['loginSvc', '$scope', '$mdDialog', 'userSvc', '$state', function (loginSvc, $scope, $mdDialog, userSvc, $state) {
    const {
      _id,
      username,
      mail,
      phone,
      neighborhood
    } = loginSvc.getCurrentUser();

    Object.assign(this, {
      _id,
      username,
      mail,
      phone,
      neighborhood
    });

    this.update = () => {
      userSvc.update(this).then(() => {
        const alert = $mdDialog.alert()
          .title('¡Operación exitosa!')
          .textContent('Tus cambios han sido guardados')
          .ariaLabel('Aceptar')
          .ok('Aceptar');

        $mdDialog.show(alert);
      }, () => {
        // error in server
      });
    };
    this.create = () => {
      userSvc.create(this).then(() => {
        const alert = $mdDialog.alert()
          .title('Operación exitosa')
          .textContent('Luego de verificar tus datos te enviaremos un código de acceso a tu mail')
          .ariaLabel('Aceptar')
          .ok('Aceptar');

        $mdDialog.show(alert).then(() => {
          $state.go('login');
        });
      }, (resp) => {
        const alert = $mdDialog.alert()
          .title('Error')
          .textContent(resp.data.message)
          .ariaLabel('Aceptar')
          .ok('Aceptar');

          $mdDialog.show(alert);
      });
    };
    this.cancel = () => {
      $state.go('login');
    }
    if ($state.current.name !== 'createUser') {
      // update
      this.actionButton = this.update;
      this.buttonLabel = 'Actualizar';
      this.showCancelButton = false;
    } else {
      // new user
      this.actionButton = this.create;
      this.buttonLabel = 'Solicitar';
      this.showCancelButton = true;
    }
  }]);
  return controllerName;
};
