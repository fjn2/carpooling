const controllerName = 'carPoolCreateCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, [function () {
    this.minDate = new Date();
    this.time = new Date();
    this.maxDate = new Date(
      this.minDate.getFullYear(),
      this.minDate.getMonth(),
      this.minDate.getDate() + 10,
      );
  }]);
  return controllerName;
};
