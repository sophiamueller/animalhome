let dogsJson = []
let searchEl = document.getElementById("search-el")
const animalList = document.getElementById("no-animal-list")
const message = document.getElementById("message")
const listBtn = document.getElementById("list-btn")
const hideListBtn = document.getElementById("hide-list-btn")
const openFormBtn = document.getElementById("open-form-btn")
const addBtn = document.getElementById("add-btn")
const deleteBtn = document.getElementById("delete-btn")
const closeFormBtn = document.getElementById("close-form-btn")
const animalInputEl = document.getElementById("animal-input-el")
//const cardList = document.getElementById("card-list")
const sectionEl = document.getElementById("new-card-wrapper")
const animalsFromLocalStorage = JSON.parse(localStorage.getItem("dogsJson") )
//const form = document.getElementByClassName('.animal-form')[0]
//const form = getFormDataAsJSON(form)
let animalBreed = []

if (animalsFromLocalStorage) {
  dogsJson = animalsFromLocalStorage
  render(dogsJson)
}

//Die Suchfunktion soll während des Tippens mit "keyup" nach einträgen suchen und den richtigen Wert ausgeben. Testen mit console.log(event.target.value)
//The filter should be case sensitive. if searchString is uppercase should turn to lowercase and vice versa
//e.g. first, convert name to lowercase and then search/compare
searchEl.addEventListener('keyup', (event) => {
  const searchString = event.target.value.toLowerCase()
  //return of searchString with includes in one of the keys from the list
  const filteredBreeds = animalBreed.filter(animal => {
    let searchResult =  animal.name.toLowerCase().includes(searchString) || animal.marking.toLowerCase().includes(searchString) || animal.age.includes(searchString)
    if (searchResult === false){
      message.textContent = "🚫 Es wurde leider kein Eintrag in der Datenbank gefunden!"
    }
     else if (searchString === ""){
      message.textContent = "Bitte einen Suchberiff eingeben!"
     }else {    
      message.textContent = "" 
      animalList.setAttribute("id", "animal-list")
     return searchResult
    }
   })
  console.log(animalBreed)
  //console.log(filteredBreeds)
  //Display all filtered items from the list
  displayAnimals(filteredBreeds)
})

//if btn is clicked. The list should show up
listBtn.addEventListener("click", function(){
  animalList.setAttribute("id", "animal-list")
  listBtn.classList.remove("show")
  listBtn.classList.add("hide")
  hideListBtn.classList.add("show")
  searchEl.value = ""
  return displayAnimals(animalBreed)
})

//if close btn is clicked. The list should collaps
hideListBtn.addEventListener("click", function(){
  animalList.removeAttribute("id", "animal-list")
  animalList.setAttribute("id", "no-animal-list")
  listBtn.classList.remove("hide")
  listBtn.classList.add("show")
  hideListBtn.classList.remove("show")
  searchEl.value = "" 
  return displayAnimals(animalBreed)
})

//Load data from json placeholder

const loadAnimals = () => {
  // const res = await fetch('https://jsonplaceholder.typicode.com/users');
  // animalBreed = await res.json();
  const dogsJson = '[{ "name": "Puppy", "marking": "MA22001", "age": "6" }, { "name": "July", "age": "10", "marking": "MA22002"}]'
  animalBreed = JSON.parse(dogsJson)
  displayAnimals(animalBreed)
}

const displayAnimals = (animals) => {
  const htmlString = animals
  .map((animal) => {
    return `
    <li class="animals">
    <h2>Name: ${animal.name}</h2>
    <p>MA-Nr.: ${animal.marking}</p>
    <p>Rasse: ${animal.age}</p>
    </li>
    `
  })
  .join('')
  animalList.innerHTML = htmlString;
}

loadAnimals()

//Button should show form for input data to dogHouse

openFormBtn.addEventListener("click", function() {
  sectionEl.classList.remove("hide")
  sectionEl.classList.add("show")
  closeFormBtn.classList.remove("hide")
  closeFormBtn.classList.add("show")
  openFormBtn.classList.add("hide")
})

closeFormBtn.addEventListener("click", function() {
  sectionEl.classList.remove("show")
  sectionEl.classList.add("hide")
  closeFormBtn.classList.remove("show")
  closeFormBtn.classList.add("hide")
  openFormBtn.classList.remove("hide")
  openFormBtn.classList.add("show")
})

//Add button should push new input to dogHouse array. 
//value should be stored in local storage

addBtn.addEventListener("click", function() {
  dogsJson.push(animalInputEl.value)
  animalInputEl.value = ""
  localStorage.setItem("dogsJson", JSON.stringify(dogsJson) )
  //animalList.classList.add("id", "animals")
  animalList.setAttribute("id", "animal-list")
  //animalList.addAttribute("animal-list")
  animalList.removeAttribute("no-animal-list")
  render(dogsJson)

  // function handleFormSubmit(event) {
  //   event.preventDefault();
    
  //   const data = new FormData(event.target);
    
  //   const formJSON = Object.fromEntries(data.entries());
  
  //   // for multi-selects 
  //   formJSON.snacks = data.getAll('snacks');
    
  //   const form = document.querySelector('.results pre');
  //   form.innerText = JSON.stringify(formJSON, null, 2);
  //}
  
})
// displayAnimals(dogsJson)

//render values in array

function render(cards) {
  let listItems = ""
  for (let i = 0; i < cards.length; i++) {
      listItems += `
          <li>
              <p>Name: ${cards[i]}</p>
          </li>
      ` 
  }
  animalList.innerHTML = listItems
  console.log(listItems)
}





