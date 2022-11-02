function fetchUsers() {
  fetch("https://63602cacca0fe3c21aae0d83.mockapi.io/api/employees/")
    .then((data) => {
      return data.json();
    })
    .then(fillTable);
}

function clearTable() {
  document.querySelector("#tbData").innerHTML = "";
}

function fillTable(data) {
  let html = "";
  for (var i = 0; i < data.length; i++) {
    html += `
        <tr class="tbData__tr">
          <th class="tbData__td" scope="row"> ${data[i].id} </th>
          <td class="tbData__td" id="name${i}"> ${data[i].name} </td>
          <td class="tbData__td" id="surname${i}"> ${data[i].surname} </td>
          <td class="tbData__td" id="title${i}"> ${data[i].title} </td>
          <td class="tbData__td" id="city${i}"> ${data[i].city} </td>
          <td class="tbData__td tbData__btn" ><button type="button" class="tbData__edit--btn" onclick="fillForm(${data[i].id})">Edit</button> <button type="button" class="tbData__delete--btn" onclick="deleteData(${data[i].id})">Delete</button> </td>
        </tr>    
          `;
  }
  document.querySelector("#tbData").innerHTML = html;
}

function deleteData(id) {
  fetch("https://63602cacca0fe3c21aae0d83.mockapi.io/api/employees/" + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(clearTable)
    .then(fetchUsers);
}
let isNewEmployeeSubmit = true;
function submitForm() {
  let name = document.querySelector("#name").value;
  let surname = document.querySelector("#surname").value;
  let title = document.querySelector("#title").value;
  let city = document.querySelector("#city").value;
  const isValid = isFormValid(name, surname, title, city);

  if (isValid) {
    if (isNewEmployeeSubmit) {
      const response = fetch(
        "https://63602cacca0fe3c21aae0d83.mockapi.io/api/employees/",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            surname: surname,
            title: title,
            city: city,
          }),
        }
      )
        .then(clearTable)
        .then(fetchUsers)
        .then(clearForm);
    } else {
      const response = fetch(
        `https://63602cacca0fe3c21aae0d83.mockapi.io/api/employees/${employeeEditId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            surname: surname,
            title: title,
            city: city,
          }),
        }
      )
        .then(clearTable)
        .then(fetchUsers)
        .then(clearForm);
    }
  }
}

function isFormValid(name, surname, title, city) {
  let isValid = true;
  if (name == "") {
    document.querySelector("#name_error").style.display = "block" ;
    isValid = false;
  } else {
    document.querySelector("#name_error").style.display = "none";
  }

  if (surname == "") {
    document.querySelector("#surname_error").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#surname_error").style.display = "none";
  }

  if (title == "") {
    document.querySelector("#title_error").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#title_error").style.display = "none";
  }

  if (city == "") {
    document.querySelector("#city_error").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#city_error").style.display = "none";
  }
  return isValid;
}

function clearForm() {
  document.querySelector("#name").value = "";
  document.querySelector("#surname").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#city").value = "";
  isNewEmployeeSubmit = true;
  employeeEditId = null;
}

let employeeEditId = null;

function fillForm(id) {
  fetch(
    "https://63602cacca0fe3c21aae0d83.mockapi.io/api/employees/" + id,
    {
      headers: { "Content-type": "application/json" },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#name").value = data.name;
      document.querySelector("#surname").value = data.surname;
      document.querySelector("#title").value = data.title;
      document.querySelector("#city").value = data.city;
      isNewEmployeeSubmit = false;
      employeeEditId = data.id;
    });
}

function updateUser() {}

fetchUsers();
