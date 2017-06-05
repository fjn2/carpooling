const controllerName = 'loginCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, ['$state', function ($state) {
    this.login = () => {
      $state.go('app');
    };
    this.requestAccess = () => {

    };
  }]);
  return controllerName;
};
