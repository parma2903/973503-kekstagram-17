'use strict';

(function () {
  var textDescription = document.querySelector('.text__description');

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.onUploadOverlayEscPress);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', window.onUploadOverlayEscPress);
  });
})();
