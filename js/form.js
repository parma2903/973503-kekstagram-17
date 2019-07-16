'use strict';

(function () {
  window.uploadInput = document.querySelector('#upload-file');
  window.uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadOverlayCloseBt = document.querySelector('.img-upload__cancel');

  var radioEffects = document.querySelectorAll('.effects__radio');

  window.uploadInput.addEventListener('change', function () {
    openUploadOverlay();
    for (var i = 0; i < radioEffects.length; i++) {
      radioEffects[i].addEventListener('click', window.chooseEffect);
    }
  });

  uploadOverlayCloseBt.addEventListener('click', function () {
    window.closeUploadOverlay();
    for (var i = 0; i < radioEffects.length; i++) {
      radioEffects[i].removeEventListener('click', window.chooseEffect);
    }
  });

  window.onUploadOverlayEscPress = function (evt) {
    if (evt.keyCode === 27) {
      window.closeUploadOverlay();
    }
  };

  window.closeUploadOverlay = function () {
    window.uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.onUploadOverlayEscPress);
    window.textHashtags.removeEventListener('change', window.textHashtags.validateInput);
    window.textHashtags.setCustomValidity('');
  };

  function openUploadOverlay() {
    radioEffects[0].checked = true;
    window.effectLevel.classList.add('hidden');
    window.setZoomValue(100);
    window.textHashtags.addEventListener('change', window.textHashtags.validateInput);
    window.uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', window.onUploadOverlayEscPress);
  }
})();
