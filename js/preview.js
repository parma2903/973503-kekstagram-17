'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var photoPopup = window.popup(bigPicture);
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');
  window.commentsLoader = bigPicture.querySelector('.comments-loader');

  function showPreview(photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    window.commentsLoader.classList.remove('visually-hidden');

    createCommentsArray(photo);
    photoPopup.open();
  }

  function createOneComment(elementData) {
    if (!comment) {
      var comment = socialComment.cloneNode(true);
    }

    comment.querySelector('.social__picture').src = elementData.avatar;
    comment.querySelector('.social__text').textContent = elementData.message;

    comment = comment.cloneNode(true);

    return comment;
  }

  function createFiveComments(dataFives) {
    var fragmentComment = document.createDocumentFragment();
    dataFives.forEach(function (item) {
      fragmentComment.appendChild(createOneComment(item));
    });
    socialComments.appendChild(fragmentComment);
  }

  function createCommentsArray(bigPictureData) {
    var MAX_COMMENTS_PAGE = 5;
    var bigPictureCommentsClone = bigPictureData.comments.slice();

    socialComments.innerHTML = '';

    window.createFirstFiveElements = function () {
      var bigPictureDataFives = bigPictureCommentsClone.splice(0, MAX_COMMENTS_PAGE);

      if (bigPictureCommentsClone.length === 0) {
        window.commentsLoader.classList.add('visually-hidden');
      }

      createFiveComments(bigPictureDataFives);
    };

    window.createFirstFiveElements();

    window.commentsLoader.addEventListener('click', window.createFirstFiveElements);
  }

  window.photo = {
    show: showPreview
  };
})();
