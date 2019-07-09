'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MODAL_OPEN_CLASS = 'modal-open';


  window.popup = function (popupElement) {
    var Popup = function () {
      this.closeBtn = popupElement.querySelector('.js-popup-close');
    };

    Popup.prototype = {
      open: function () {
        popupElement.classList.remove('hidden');
        document.body.classList.add(MODAL_OPEN_CLASS);
        document.addEventListener('keydown', this.onPopupEscPress);
      },

      close: function () {
        popupElement.classList.add('hidden');
        newPopup.onPopupClose();
        document.body.classList.remove(MODAL_OPEN_CLASS);
        document.removeEventListener('keydown', this.onPopupEscPress);
      },

      onPopupEscPress: function (evt) {
        if (evt.keyCode === ESC_KEYCODE && newPopup.checkClosePossibility(evt.target)) {
          newPopup.close();
        }
      },

      checkClosePossibility: function () {
        return true;
      },

      onPopupClose: function () {}
    };

    var newPopup = new Popup();

    newPopup.closeBtn.addEventListener('click', newPopup.close);
    newPopup.closeBtn.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        newPopup.close();
      }
    });

    return newPopup;
  };
})();
