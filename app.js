// API

var courseApi = "http://localhost:3000/course";

// Call get course

getCourse();

// Function get course

function getCourse() {
  fetch(courseApi)
    .then(function (res) {
      return res.json();
    })
    .then(function (courses) {
      var listCourse = document.querySelector("#listCourse");
      var htmlCourse = courses.map(function (course) {
        return `
                <li class="course-item-${course.id}">
                    <h4>${course.name}</h4>
                    <p>${course.description}</p>
                    <button onclick="deleteCourse(${course.id})">Delete</button>
                    <button onclick="editCourse(${course.id})">Edit</button>
                </li>
                `;
      });
      listCourse.innerHTML = htmlCourse.join('');
    });
}

// Function create course

function createCourse(data, callback) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(courseApi, option)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}

// Function delete course

function deleteCourse(id) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(courseApi + "/" + id, option)
    .then(function (res) {
      return res.json();
    })
    .then(function () {
      getCourse();
    });
}

// Edit course

function updateCourse(id, data, callback) {
  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(courseApi + "/" + id, option)
    .then(function (res) {
      return res.json();
    })
    .then(callback)
}

// Get data edit course

function editCourse(id) {
  var name = document.querySelector(`.course-item-${id} h4`).textContent;
  var description = document.querySelector(`.course-item-${id} p`).textContent;

  var nameInput = document.querySelector("input[name='name']").value = name;
  var descriptionInput = document.querySelector("input[name='description']").value = description;

  var btn_edit = document.querySelector("#create");
  btn_edit.textContent = "Edit";

  btn_edit.onclick = function() {
    var name = document.querySelector("input[name='name']").value;
    var description = document.querySelector("input[name='description']").value;

    var data = {
      name: name,
      description: description,
    };

  // Event update course

  updateCourse(id, data, function () {
    getCourse();
    name.value = "";
    description.value = "";
    btn_edit.textContent = "Create";
  });
}

}

// Event create course

var btn_create = document.querySelector("#create");

btn_create.onclick = function () {
  var name = document.querySelector("input[name='name']").value;
  var description = document.querySelector("input[name='description']").value;

  var data = {
    name: name,
    description: description,
  };

  createCourse(data, function () {
    getCourse();
  });
};



