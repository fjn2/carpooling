const serviceName = 'loadingSvc';

module.exports = function (mod) {
  mod.factory(serviceName, [function () {
    let loadingState;
    const show = () => {
      loadingState = true;
    };
    const hide = () => {
      loadingState = false;
    };

    const getState = () => loadingState;

    return {
      show,
      hide,
      getState,
    };
  }]);
  return serviceName;
};
