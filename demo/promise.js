var users = [
  {
    id: 1,
    name: "Tien",
    place: "HCM",
  },
  {
    id: 2,
    name: "Thanh",
    place: "Tuy Hoa",
  },
  {
    id: 3,
    name: "Vi",
    place: "Ninh Thuan",
  },
];

var comments = [
  {
    id: 1,
    user_id: 1,
    content: "hello",
  },
  {
    id: 2,
    user_id: 2,
    content: "xin chao moi nguoi",
  },
  {
    id: 3,
    user_id: 3,
    content: "cam on",
  },
];

function getComments() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(comments);
    }, 1000);
  });
}

function getUsersByIds(userIds) {
  return new Promise(function (resolve) {
    var result = users.filter(function (user) {
      return userIds.includes(user.id);
    });
    setTimeout(function () {
      resolve(result);
    }, 1000);
  });
}

getComments()
  .then(function (comments) {
    var userIds = comments.map((comment, index) => {
      return comment.user_id;
    });
    return getUsersByIds(userIds).then(function (users) {
      return { users, comments };
    });
  })
  .then(function (data) {
    var commentBlock = document.getElementById("comment-block");
    var html = "";
    data.comments.forEach(function (comment) {
      var user = data.users.find(function (user) {
        return user.id === comment.user_id;
      });
      html += `<li>${user.name}: ${comment.content}</li>`;
    });

    commentBlock.innerHTML = html;
  });
