'use strict';

(function () {
  var uploadInput = document.querySelector('#upload-file');
  window.uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadOverlayCloseBt = document.querySelector('.img-upload__cancel');

  var effectsRadio = document.querySelectorAll('.effects__radio');

  uploadInput.addEventListener('change', function () {
    openUploadOverlay();
    for (var i = 0; i < effectsRadio.length; i++) {
      effectsRadio[i].addEventListener('click', window.chooseEffect);
    }
  });

  uploadOverlayCloseBt.addEventListener('click', function () {
    closeUploadOverlay();
    for (var i = 0; i < effectsRadio.length; i++) {
      effectsRadio.removeEventListener('click', window.chooseEffect);
    }
  });

  window.onUploadOverlayEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeUploadOverlay();
    }
  };

  function closeUploadOverlay() {
    window.uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.onUploadOverlayEscPress);
  }

  function openUploadOverlay() {
    effectsRadio[0].checked = true;
    window.effectLevel.classList.add('hidden');
    window.setZoomValue(100);

    window.uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', window.onUploadOverlayEscPress);
  }

})();
