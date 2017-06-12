const serviceName = 'deviceIdInterceptor';

module.exports = function (mod) {
  mod.factory(serviceName, ['device', function (device) {
    return {
      // optional method
      request: (config) => {
        config.headers['VND-device-id'] = device.uuid;
        // do something on success
        return config;
      },
    };
  }]);
  mod.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(serviceName);
  }]);
};
