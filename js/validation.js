'use strict';

(function () {
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAGS_MAX_COUNT = 5;
  var textDescription = document.querySelector('.text__description');
  window.textHashtags = document.querySelector('.text__hashtags');

  forbidCloseFormElementFocus(textDescription);
  forbidCloseFormElementFocus(window.textHashtags);

  window.textHashtags.addEventListener('change', function () {
    var invalidMessage = [];
    var inputText = window.textHashtags.value.toLowerCase();
    if (inputText) {
      var inputArray = inputText.split(' ').filter(function (item) {
        return item !== '';
      });

      var isStartNotHashtag = inputArray.some(function (item) {
        return item[0] !== '#';
      });
      if (isStartNotHashtag) {
        invalidMessage.push('Хэш-тег должен начинаеться с символа #');
      }

      var isOnlyLatticeHashtag = inputArray.some(function (item) {
        return item === '#';
      });
      if (isOnlyLatticeHashtag) {
        invalidMessage.push('Хеш-тег не может состоять только из одной решётки');
      }

      var isSplitSpaceHashtag = inputArray.some(function (item) {
        return ~item.indexOf('#', 1);
      });
      if (isSplitSpaceHashtag) {
        invalidMessage.push('Хэш-теги разделяются пробелами');
      }

      var isRepeatHashtag = inputArray.some(function (item, i, arr) {
        return ~arr.indexOf(item, i + 1);
      });
      if (isRepeatHashtag) {
        invalidMessage.push('Один и тот же хэш-тег не может быть использован дважды');
      }

      var isLongHashtag = inputArray.some(function (item) {
        return item.length > HASHTAG_MAX_LENGTH;
      });
      if (isLongHashtag) {
        invalidMessage.push('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      }

      if (inputArray.length > HASHTAGS_MAX_COUNT) {
        invalidMessage.push('Нельзя указать больше пяти хэш-тегов');
      }
    }

    window.textHashtags.setCustomValidity(invalidMessage.join('. \n'));
  });

  function forbidCloseFormElementFocus(element) {
    element.addEventListener('focus', function () {
      document.removeEventListener('keydown', window.onUploadOverlayEscPress);
    });
    element.addEventListener('blur', function () {
      document.addEventListener('keydown', window.onUploadOverlayEscPress);
    });
  }
})();
