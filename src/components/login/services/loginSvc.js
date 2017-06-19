const serviceName = 'loginSvc';

module.exports = function (mod) {
  mod.factory(serviceName, ['$http', '$q', 'configuration', 'device', function ($http, $q, configuration, device) {
    let currentUser = {};

    const checkForloggedUser = () => (
      $http.post(`${configuration.host}/user/login`, {
        device: device.uuid,
      }).then((resp) => {
        if (resp.data) {
          Object.assign(currentUser, {
            _id: resp.data._id,
            username: resp.data.username,
            mail: resp.data.mail,
            phone: resp.data.phone,
            neighborhood: resp.data.neighborhood,
          });
        } else {
          console.error('checkForloggedUser got empty user');
        }
        // store the information of the user
        return resp.data[0];
      }, $q.reject)
    );
    const getCurrentUser = () => currentUser;

    const logout = () => {
      currentUser = {};
      return $http.post(`${configuration.host}/user/logout`, {});
    };

    const validateCode = registration_code => (
      $http.post(`${configuration.host}/user/validate`, {
        registration_code,
      })
    );
    const sendCodeAgain = () => (
      $http.get(`${configuration.host}/user/send/code`)
    );


    return {
      checkForloggedUser,
      getCurrentUser,
      validateCode,
      currentUser,
      logout,
      sendCodeAgain,
    };
  }]);
  return serviceName;
};
