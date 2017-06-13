const serviceName = 'loginSvc';
const loginUrl = '/user/login';

module.exports = function (mod) {
  mod.factory(serviceName, ['$http', '$q', 'configuration', 'device', function ($http, $q, configuration, device) {
    let currentUser = {};

    const checkForloggedUser = () => (
      $http.post(`${configuration.host}${loginUrl}`, {
        device: device.uuid,
      }).then((resp) => {
        Object.assign(currentUser, {
          _id: resp.data[0]._id,
          username: resp.data[0].username,
          mail: resp.data[0].mail,
          phone: resp.data[0].phone,
          neighborhood: resp.data[0].neighborhood,
        });
        // store the information of the user
        return resp.data[0];
      }, $q.reject)
    );
    const getCurrentUser = () => currentUser;

    const logout = () => {
      currentUser = {};
    };

    const validateCode = (code) => {
      // TODO
    };

    return {
      checkForloggedUser,
      getCurrentUser,
      validateCode,
      currentUser,
      logout,
    };
  }]);
  return serviceName;
};
