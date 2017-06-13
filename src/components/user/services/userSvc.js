const serviceName = 'userSvc';
const loginUrl = '/user/login';

module.exports = function (mod) {
  mod.factory(serviceName, ['$http', 'configuration', function ($http, configuration) {
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
      })
    );
    return {
      update,
      create,
    };
  }]);
  return serviceName;
};
