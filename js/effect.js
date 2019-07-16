'use strict';

(function () {
  var EFFECTS_CLASS_PREFIX = 'effects__preview--';
  var EffectsSettings = {
    'none': {
      value: '',
      min: '',
      max: '',
      filter: '',
    },
    'chrome': {
      value: '',
      min: 0,
      max: 1,
      filter: 'grayscale',
    },
    'sepia': {
      value: '',
      min: 0,
      max: 1,
      filter: 'sepia',
    },
    'marvin': {
      value: '%',
      min: 0,
      max: 100,
      filter: 'invert',
    },
    'phobos': {
      value: 'px',
      min: 0,
      max: 3,
      filter: 'blur',
    },
    'heat': {
      value: '',
      min: 1,
      max: 3,
      filter: 'brightness',
    },
  };

  var uploadForm = document.querySelector('#upload-select-image');
  var effectDepth = uploadForm.querySelector('.effect-level__depth');
  var levelPin = uploadForm.querySelector('.effect-level__pin');
  window.effectLevel = uploadForm.querySelector('.effect-level');
  var effectLevelValueElement = window.effectLevel.querySelector('.effect-level__value');
  var effectLevelLine = window.effectLevel.querySelector('.effect-level__line');

  var uploadPreview = document.querySelector('.img-upload__preview');
  window.imageUploadPreviewElement = uploadPreview.querySelector('img');

  levelPin.addEventListener('mouseup', function () {
    changeIntensityEffect();
  });

  levelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;

      var pinElementLeft = levelPin.offsetLeft - shiftX;
      var lineElementLeft = effectLevelLine.getBoundingClientRect().left;
      var lineElementRight = effectLevelLine.getBoundingClientRect().right;
      if (startCoordsX <= lineElementLeft) {
        pinElementLeft = 0;
      } else if (startCoordsX >= lineElementRight) {
        pinElementLeft = effectLevelLine.clientWidth;
      }

      changePinValue(pinElementLeft);
    }
    function onMouseUp() {
      changeIntensityEffect();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.chooseEffect = function (evt) {
    changeIntensityEffect();
    changePinValue(100);
    changeEffectClass(evt);
  };

  function changeEffectClass(evt) {
    var selectedEffect = evt.target.value;
    var effects = Object.keys(EffectsSettings);

    if (evt.target.value === 'none') {
      window.effectLevel.classList.add('hidden');
    } else {
      window.effectLevel.classList.remove('hidden');
    }

    for (var i = 0; i < effects.length; i++) {
      window.imageUploadPreviewElement.classList.remove(EFFECTS_CLASS_PREFIX + effects[i]);
    }

    window.imageUploadPreviewElement.classList.add(EFFECTS_CLASS_PREFIX + selectedEffect);

    effectDepth.style.width = '100%';
    levelPin.style.left = '100%';
    effectLevelValueElement.value = 100;
  }

  function calculateValue(value, min, max) {
    var result = (parseInt(value, 10) / 100) * (max - min) + min;
    return result.toFixed(2);
  }

  function changePinValue(position) {
    var value = (position / effectLevelLine.clientWidth) * 100;
    effectDepth.style.width = value + '%';
    levelPin.style.left = value + '%';
    effectLevelValueElement.value = parseInt(value, 10);
  }

  function changeIntensityEffect() {
    var effect = document.querySelector('.effects__radio:checked').value.toLowerCase();

    if (effect === 'none') {
      window.imageUploadPreviewElement.style.filter = '';
    } else {
      var selectedEffectSettings = EffectsSettings[effect];
      var effectType = selectedEffectSettings.filter.toLowerCase();
      var effectValue = selectedEffectSettings.value;
      var effectMin = selectedEffectSettings.min;
      var effectMax = selectedEffectSettings.max;
      var calculatedValue = calculateValue(effectLevelValueElement.value, effectMin, effectMax);
      window.imageUploadPreviewElement.style.filter = effectType + '(' + calculatedValue + effectValue + ')';
    }
  }
})();
