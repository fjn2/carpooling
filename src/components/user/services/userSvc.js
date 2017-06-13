const serviceName = 'userSvc';

module.exports = function (mod) {
  mod.factory(serviceName, ['$http', 'configuration', 'device', function ($http, configuration, device) {
    const update = ({
      _id,
      username,
      mail,
      phone,
      neighborhood,
    }) => (
      $http.put(`${configuration.host}/user?_id=${_id}`, {
        username,
        mail,
        phone,
        neighborhood,
      })
    );
    const create = ({
      username,
      mail,
      phone,
      neighborhood,
    }) => (
      $http.post(`${configuration.host}/user`, {
        username,
        mail,
        phone,
        neighborhood,
        device: device.uuid,
      })
    );
    return {
      update,
      create,
    };
  }]);
  return serviceName;
};
