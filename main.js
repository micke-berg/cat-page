const btnNone = document.querySelector('#btn-no-sort');
const btnMuchCute = document.querySelector('#btn-much-cute');
const btnNotCute = document.querySelector('#btn-not-cute');
const imageContainer = document.querySelector('#image-container');


let url = "http://localhost:8081/catdata.json";
let catsArr = [];
let catsOriginalArray = [];

let head = new Headers();
    head.append("Accept", "application/json");

let req = new Request(url, {
  method: "GET", 
  headers: head,
  cache: 'no-cache',
  mode: "cors",
});

fetch(req)
.then((resp) => {
  if(resp.ok) {
    return resp.json();
  } 
  else{
    throw new Error("Nope... you´ve got a problem here!");
  }
})
.then((data) => {
    catsArr = data.cats;
    catsOriginalArray = [...catsArr];
    printCats();
})
.catch((err) => {
  console.log("Error:", err.message);
});

function notSorted() {
  catsArr = [...catsOriginalArray];
  printCats();
}

function muchCute() {
  catsArr.sort((a, b) => {
    return b.cutenessLevel - a.cutenessLevel;
  })
  printCats();
}

function notCute() {
  catsArr.sort((a, b) => {
    return a.cutenessLevel - b.cutenessLevel;
  })
  printCats();
}

function printCats() {
  imageContainer.innerHTML = '';
  catsArr.map(cat => {
    imageContainer.innerHTML += `
    <div class="card">
      <div class="image">
        <img src="./images/${cat.image}" alt="cat">
      </div>
      <p class="name">${cat.name}</p>
    </div>`
  })
}

btnNone.addEventListener('click', notSorted);
btnMuchCute.addEventListener('click', muchCute);
btnNotCute.addEventListener('click', notCute);