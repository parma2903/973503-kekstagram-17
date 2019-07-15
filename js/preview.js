'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var photoPopup = window.popup(bigPicture);

  function showPreview(photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    var comments = bigPicture.querySelector('.social__comments');
    var comment = comments.querySelector('.social__comment');

    comments.innerHTML = '';
    photo.comments.forEach(function (commentItem) {
      var currentComment = comment.cloneNode(true);
      var commentAvatar = currentComment.querySelector('.social__picture');

      commentAvatar.src = commentItem.avatar;
      commentAvatar.alt = commentItem.name;
      currentComment.querySelector('.social__text').textContent = commentItem.message;
      comments.appendChild(currentComment);
    });

    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
    photoPopup.open();
    document.body.classList.add('modal-open');
  }

  window.photo = {
    show: showPreview
  };
})();
