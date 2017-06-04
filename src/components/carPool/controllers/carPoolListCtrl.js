const controllerName = 'carPoolListCtrl';

module.exports = function(mod) {
  mod.controller(controllerName, ['$scope', function($scope) {
    this.carTrips = [];
    for (let i = 0; i < 100; i += 1) {
      this.carTrips.push({
        when: '5 / 12 / 2017',
        destination: 'faa',
        driverName: 'Katana',
      });
    }
  }]);
  return controllerName;
};
