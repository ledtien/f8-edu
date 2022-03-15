var courseAPI = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourses);
  handleCreateForm();
}

start();

function getCourses(callback) {
  fetch(courseAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function createCourses(data, callback) {
  fetch(courseAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function handleDeleteCourse(id) {
  fetch(courseAPI + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      var courseItem = document.querySelector(".course-item-" + id);

      if (courseItem) {
        courseItem.remove();
      }
    });
}

function updateCourse(id, data, callback) {
  var options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(coursesApi + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderCourses(courses) {
  var listCourses = document.getElementById("list-courses");
  var htmls = courses.map(function (course) {
    return `
        <li class="course-item-${course.id}">
        <h4 class="course-name-${course.id}">${course.name}</h4>
        <p class="course-description-${course.id}">${course.description}</p>
        <button onclick="handleDeleteCourse(${course.id})">Delete</button>
        <button onclick="handleUpdateCourse(${course.id})">Edit</button>
        
        </li>
        `;
  });
  listCourses.innerHTML = htmls.join("");
}

function handleCreateForm() {
  var createBtn = document.getElementById("create");

  createBtn.onclick = function () {
    var name = document.querySelector('input[name ="name"]').value;
    var description = document.querySelector(
      'input[name ="description"]'
    ).value;
    var formData = {
      name,
      description,
    };
    createCourses(formData, function () {
      getCourses(renderCourses);
    });
  };
}

function handleUpdateCourse(id) {
  var name, description;
  name = document.querySelector(".course-name-" + id).innerText;

  description = document.querySelector(".course-description-" + id).innerText;
  document.querySelector('input[name ="name"]').value = name;

  document.querySelector('input[name ="description"]').value = description;

  var formData = {
    name: name,
    description: description,
  };
  updateCourse(id, formData, function () {
    getCourses(renderCourse);
  });
}
