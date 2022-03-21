let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function allToys() {
    fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(data => {
        console.log(data)

        data.forEach(toy => createToys(toy))
      })

  }
  allToys();



  function createToys(toy) {
    container = document.querySelector("#toy-collection");
    let card = document.createElement('div');
    card.innerHTML =
      `<div class="card">
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes}likes</p>
  <button class="like-btn" id=${toy.id}>Like ❤️</button>
  </div>`
    container.appendChild(card);


 
  const totalCount = card.querySelector("p");
  const incrementCount = card.querySelector('.like-btn');
  let count = toy.likes;
 

   const handleIncrement = () => {
     console.log(incrementCount)
     count++;
     totalCount.innerText =`${count}likes`;
     console.log(count)
     patchToys(toy,count);
     //document.appendChild(count);
   };

  incrementCount.addEventListener("click",handleIncrement);
 
  }


  document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)

  function handleSubmit(e) {
    e.preventDefault()

    let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    postToys(toyObj);
    

    createToys(toyObj);
   
  }

  function postToys(toyObj) {
    console.log(toyObj)
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify(toyObj)
    })
      .then(response => response.json())
      .then(newToy => createToys(newToy))

  }

  function patchToys(toy,count) {
    console.log(toy)
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({likes:count})
      
  })
  .then(response => response.json())
  .then(likesToy => createToys(likesToy))

}

});











