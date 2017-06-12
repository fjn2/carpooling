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
        return `(en ${Math.floor(diff)})`;
      }
      diff /= 60;
      if (diff < 24) { // hours
        const minutes = (diff % 1) * 60;
        return `(en ${Math.floor(diff)}:${Math.floor(minutes)})`;
      }
      return '(+24 hs)';
    }

    const get = () => (
      $http.get(`${configuration.host}/journey`).then((resp) => {
        const journeries = resp.data.map(({ car_identification, description, from_to, driver, date_time, free_seats, total_seats, users, _id }) => {
          const journeyTime = new Date(date_time);
          let when = `${journeyTime.getDate()} / ${journeyTime.getMonth() + 1} / ${journeyTime.getFullYear()} ${journeyTime.getHours()}:${journeyTime.getMinutes()} `;

          when += getPendingTime(journeyTime);

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
            admin: loginSvc.getCurrentUser()._id === driver._id,

            added: !!Math.round(Math.random()),
          };
        });
        return journeries;
      })
    );
    const saveJourney = ({ car_identification, description, from_to, date_time, total_seats }) => {

      return $http.post(`${configuration.host}/journey`, {
        car_identification,
        description,
        from_to,
        driver: loginSvc.getCurrentUser(),
        date_time,
        total_seats,
      }).then(() => {

      });
    };
    const updateJourney = ({ car_identification, description, from_to, date_time, total_seats, _id }) => {
      return $http.put(`${configuration.host}/journey?_id=${_id}`, {
        car_identification,
        description,
        from_to,
        driver: loginSvc.getCurrentUser(),
        date_time,
        total_seats,
      }).then(() => {

      });
    };
    const deleteJourney = ({ _id }) => {
      return $http.delete(`${configuration.host}/journey?_id=${_id}`).then(() => {

      });
    };
    return {
      get,
      saveJourney,
      deleteJourney,
      updateJourney,
    };
  }]);
  return serviceName;
};
