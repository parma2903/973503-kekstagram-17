'use strict';

(function () {
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var DOWNLOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var imgUploadForm = document.querySelector('.img-upload__form');
  var main = document.querySelector('main');

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(imgUploadForm), isSuccess);
  });

  function isSuccess() {
    window.closeUploadOverlay();
    resetImgUpload();
    openDialog('success');
    closeDialog('success');
  }

  function onError() {
    window.closeUploadOverlay();
    resetImgUpload();
    openDialog('error');
    closeDialog('error');
  }

  function resetImgUpload() {
    window.textHashtags.value = '';
    window.textDescription.value = '';
    window.uploadInput.value = '';
  }

  function openDialog(dialogSelector) {
    var successTemplate = document.querySelector('#' + dialogSelector).content.querySelector('.' + dialogSelector);
    var successTemplateClone = successTemplate.cloneNode(true);

    main.appendChild(successTemplateClone);
  }

  function closeDialog(dialogSelector) {
    var dialog = main.querySelector('.' + dialogSelector);
    var dialogButtons = dialog.querySelectorAll('.' + dialogSelector + '__button');

    var removeDialog = function () {
      dialog.remove();
      document.removeEventListener('keydown', onDialogEscPress);
    };

    var onDialogEscPress = function (evt) {
      if (evt.keyCode === 27) {
        removeDialog();
      }
    };

    var dialogRemove = function (evt) {
      if (!evt.target.closest('.' + dialogSelector + '__inner')) {
        removeDialog();
      }
    };

    document.addEventListener('keydown', onDialogEscPress);
    dialog.addEventListener('click', dialogRemove);
    dialogButtons.forEach(function (item) {
      item.addEventListener('click', removeDialog);
    });
  }

  function load(onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          window.onError('Не верный запрос');
          break;
        case 401:
          window.onError('Пользователь не авторизован');
          break;
        case 404:
          window.onError('Данных не найдено');
          break;

        case 500:
          window.onError('Ошибка сервера');
          break;

        default:
          window.onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText
          );
      }
    });

    xhr.addEventListener('error', function () {
      window.onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      window.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;

    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  }

  function save(data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 20 auto; text-align: center; background-color: #4949fa; color: #ffe200; padding: 10px;';
    node.style.position = 'absolute';
    node.style.width = '50%';
    node.style.left = '25%';
    node.style.top = '25px';
    node.style.fontSize = '30px';
    node.style.outline = '4px solid red';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler
  };
})();
