'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;

  function debounce(cb) {
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.util = {
    debounce: debounce
  };
})();

