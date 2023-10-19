// Initial Render
document.addEventListener('DOMContentLoaded', () => {
  // Render dogs
  fetchDogs();

  // Edit dogs
  const form = document.getElementById('dog-form');
  form.addEventListener('submit', (event) => {
      event.preventDefault();
      updateDog(event.target);
  })
})


// Fetch Requests
function fetchDogs(){
  return fetch('http://localhost:3000/dogs')
  .then((response) => response.json())
  .then((data) => {
      data.map(dog => renderDog(dog))
  })
}

function postDog(id, newDogData){
  fetch(`http://localhost:3000/dogs/${id}`,{
      method: "PATCH",
      headers:{
          'Content-type': 'application/json',
      },
      body: JSON.stringify(newDogData)
  })
  .then((response) => response.json())
  .then((data) => data.map(dog => renderDog(dog)));
}

// DOM Render Functions
function renderDog(dogData){
  // Render a dog as a row appended to the table
  
  let row = document.createElement('tr');
  row.innerHTML =`
          <td>${dogData.name}</td>
          <td>${dogData.breed}</td>
          <td>${dogData.sex}</td>
          <td><button>Edit</button></td>
  `
  let editBtn = row.querySelector('button');
  editBtn.addEventListener('click', () => populateForm(dogData));

  (document.getElementById('table-body')).appendChild(row);
}

// Event Handlers
function populateForm(dogData){
  const form = document.getElementById('dog-form');
  form[0].value = dogData.name;
  form[1].value = dogData.breed;
  form[2].value = dogData.sex;
  form.setAttribute('alt', dogData.id);
}

function updateDog(form){
  const id = form.getAttribute('alt');

  const newDogData = {
      name: form[0].value,
      breed: form[1].value,
      sex: form[2].value
  }
  
  postDog(id, newDogData);
}