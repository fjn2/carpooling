const controllerName = 'carPoolListCtrl';

module.exports = function (mod) {
  mod.controller(controllerName, [function () {
    this.carTrips = [];
    for (let i = 0; i < 30; i += 1) {
      this.carTrips.push({
        when: '5 / 12 / 2017 18:00 (en 15\')',
        destination: 'Quilmes',
        availablePlaces: 3,
        driverName: 'Katana',
        added: !!Math.round(Math.random()),
      });
    }
  }]);
  return controllerName;
};
