const controllerName = 'loginCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$state', 'loginSvc', function ($state, loginSvc) {
    this.login = () => {
      $state.go('app');
    };
    this.requestAccess = () => {

    };
  }]);
  return controllerName;
};
