document.addEventListener("DOMContentLoaded", () => {
  fetchDog();
  const btns = document.getElementsByTagName("button");
  const form = document.querySelector("#dog-form");
  let dogObject;
  let dogOfTheRow;

  setTimeout(() => {
    Array.from(btns).forEach((btn) => {
      btn.addEventListener("click", (eventFn) => {
        dogOfTheRow = eventFn.target.parentNode.parentNode;
        dogObject = {
          id: dogOfTheRow.id,
          name: dogOfTheRow.children[0].innerText,
          breed: dogOfTheRow.children[1].innerText,
          sex: dogOfTheRow.children[2].innerText,
        };
        editDog(dogObject);
      });
    });
  }, 500);

  form.addEventListener("submit", (eventFn) => {
    eventFn.preventDefault();
    dogObject.name = eventFn.target.elements["name"].value;
    dogObject.breed = eventFn.target.elements["breed"].value;
    dogObject.sex = eventFn.target.elements["sex"].value;
    updateDog(dogObject);
    dogOfTheRow.children[0].innerText = dogObject.name;
    dogOfTheRow.children[1].innerText = dogObject.breed;
    dogOfTheRow.children[2].innerText = dogObject.sex;
    form.reset();
  });
});

function fetchDog() {
  fetch("http://localhost:3000/dogs")
    .then((response) => response.json())
    .then((dogData) => {
      Array.from(dogData).forEach((dog) => {
        dogTable(dog);
      });
    });
}
function dogTable(dogObject) {
  const tableBody = document.querySelector("#table-body");
  const table = document.createElement("tr");
  table.id = dogObject.id;
  table.innerHTML = `<td>${dogObject.name}</td>
                       <td>${dogObject.breed}</td>
                       <td>${dogObject.sex}</td>
                       <td><button>Edit Dog</button></td>`;
  tableBody.appendChild(table);
}
function editDog(dogObject) {
  const form = document.querySelector("#dog-form");
  form.elements["name"].value = dogObject.name;
  form.elements["breed"].value = dogObject.breed;
  form.elements["sex"].value = dogObject.sex;
}

function updateDog(dogObject) {
  fetch(`http://localhost:3000/dogs/${dogObject.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dogObject),
  }).then((res) => res.json());
}
