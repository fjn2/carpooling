const controllerName = 'userDetailCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['loginSvc', '$scope', '$mdDialog', 'userSvc', function (loginSvc, $scope, $mdDialog, userSvc) {
    let {
      _id,
      username,
      mail,
      phone,
      neighborhood,
    } = loginSvc.getCurrentUser();

    Object.assign(this, {
      _id,
      username,
      mail,
      phone,
      neighborhood,
    });

    this.update = () => {
      userSvc.update(this).then(() => {
        const alert = $mdDialog.alert()
          .title('Operación exitosa')
          .textContent('Tus cambios se encuentran guardados en el servidor')
          .ariaLabel('Aceptar')
          .ok('Aceptar');

        $mdDialog.show(alert);
      }, () => {
        // error in server
      });

      console.log($scope);
    };
  }]);
  return controllerName;
};
