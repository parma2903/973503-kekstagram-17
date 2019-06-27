'use strict';

(function () {
  var ZOOM_MIN_SCALE = 0;
  var ZOOM_MAX_SCALE = 100;
  var ZOOM_STEP = 25;
  var scaleControlValue = window.uploadOverlay.querySelector('.scale__control--value');
  var scaleControlSmaller = window.uploadOverlay.querySelector('.scale__control--smaller');
  var scaleControlBigger = window.uploadOverlay.querySelector('.scale__control--bigger');

  scaleControlSmaller.addEventListener('click', function () {
    outZoom();
  });

  scaleControlBigger.addEventListener('click', function () {
    inZoom();
  });

  function outZoom() {
    var scaleSmaller = parseInt(scaleControlValue.value, 10) - ZOOM_STEP;
    if (scaleSmaller <= ZOOM_MIN_SCALE) {
      scaleSmaller = ZOOM_MIN_SCALE;
      window.setZoomValue(ZOOM_MIN_SCALE);
    } else {
      window.setZoomValue(scaleSmaller);
    }

    window.imageUploadPreviewElement.style.transform = 'scale(' + scaleSmaller / 100 + ')';
  }

  function inZoom() {
    var scaleBigger = parseInt(scaleControlValue.value, 10) + ZOOM_STEP;
    if (scaleBigger >= ZOOM_MAX_SCALE) {
      scaleBigger = ZOOM_MAX_SCALE;
      window.setZoomValue(ZOOM_MAX_SCALE);
    } else {
      window.setZoomValue(scaleBigger);
    }

    window.imageUploadPreviewElement.style.transform = 'scale(' + scaleBigger / 100 + ')';
  }

  window.setZoomValue = function (value) {
    scaleControlValue.value = value + '%';
  };

})();
