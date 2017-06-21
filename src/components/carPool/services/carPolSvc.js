const serviceName = 'carPolSvc';

module.exports = function (mod) {
  mod.factory(serviceName, ['$http', 'configuration', 'loginSvc', function ($http, configuration, loginSvc) {

    function getPendingTime(time) {
      let diff = time - new Date();
      if (diff < 0) {
        return '(se ha ido)';
      }
      diff /= 1000;
      if (diff < 60) { // seconds
        return '(saliendo)';
      }
      diff /= 60;
      if (diff < 60) { // minutes
        return `(en ${Math.floor(diff)}')`;
      }
      diff /= 60;
      if (diff < 24) { // hours
        const minutes = (diff % 1) * 60;
        return `(en ${Math.floor(diff)}hs ${Math.floor(minutes)}')`;
      }
      return '(+24 hs)';
    }

    function formatJourney ({ car_identification, description, from_to, driver, date_time, free_seats, total_seats, users, _id, flexible_time }) {
      let added = false;
      const journeyTime = new Date(date_time);
      let when = `${journeyTime.getDate()} / ${journeyTime.getMonth() + 1} / ${journeyTime.getFullYear()} ${journeyTime.getHours()}:${('0' + journeyTime.getMinutes()).slice(-2)} `;

      when += getPendingTime(journeyTime);

      users.forEach((user) => {
        if (user._id === loginSvc.getCurrentUser()._id) {
          added = true;
        }
      });

      return {
        car_identification,
        description,
        from_to,
        driver,
        date_time,
        free_seats,
        total_seats,
        users,
        when,
        _id,
        flexible_time,
        departure: new Date() > journeyTime,
        admin: loginSvc.getCurrentUser()._id === driver._id,
        added
      };
    }

    const get = () => (
      $http.get(`${configuration.host}/journey`).then((resp) => {
        const journeries = resp.data.map(formatJourney);
        return journeries;
      })
    );
    const saveJourney = ({ car_identification, description, from_to, date_time, total_seats, flexible_time }) => {

      return $http.post(`${configuration.host}/journey`, {
        car_identification,
        description,
        from_to,
        driver: loginSvc.getCurrentUser(),
        date_time,
        total_seats,
        flexible_time
      }).then(() => {

      });
    };
    const updateJourney = ({ car_identification, description, from_to, date_time, total_seats, _id, flexible_time }) => {
      return $http.put(`${configuration.host}/journey?_id=${_id}`, {
        car_identification,
        description,
        from_to,
        driver: loginSvc.getCurrentUser(),
        date_time,
        total_seats,
        flexible_time
      }).then(() => {

      });
    };
    const deleteJourney = ({ _id }) => {
      return $http.delete(`${configuration.host}/journey?_id=${_id}`).then(() => {

      });
    };

    const getMyJourneys = () => (
      $http.get(`${configuration.host}/user/journey`).then((resp) => {
        const journeries = resp.data.map(formatJourney);
        return journeries;
      })
    );

    const addToJourney = ({ _id }) => {
      return $http.put(`${configuration.host}/journey/add?_id=${_id}`).then(() => {

      });
    };
    const removeToJourney = ({ _id }) => {
      return $http.delete(`${configuration.host}/journey/remove?_id=${_id}`).then(() => {

      });
    };

    return {
      get,
      saveJourney,
      deleteJourney,
      updateJourney,
      getMyJourneys,
      addToJourney,
      removeToJourney
    };
  }]);
  return serviceName;
};
