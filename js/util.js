'use strict';

(function () {
  function getElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getRandomFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  window.util = {
    getElement: getElement,
    getRandomFromInterval: getRandomFromInterval,
  };
})();
