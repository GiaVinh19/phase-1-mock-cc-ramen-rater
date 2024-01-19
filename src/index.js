// write your code here 
function fetchRamens(){
    return fetch("http://localhost:3000/ramens") // fetch url
    .then(resp => resp.json()) // convert json to javascript
    .then(ramens => renderRamenImage(ramens)) // add information from json to html 
}

function renderRamenImage(ramens) { // create interactive img into html that list ramen's value
    const ramenImage = document.getElementById("ramen-menu"); // get ramen-menu id element
    const detailImage = document.querySelector(".detail-image"); // get detail-image class element
    const ramenName = document.querySelector(".name"); // get name class element
    const ramenRestaurant = document.querySelector(".restaurant"); // get restaurant class element
    const ramenRating = document.getElementById("rating-display"); // get rating-display id element
    const ramenComment = document.getElementById("comment-display"); // get comment-display id element

    ramens.forEach(ramen => { // go through json's aray to get every individual object
        const img = document.createElement("img"); // create img element
        const src = document.createAttribute("src"); // create src attribute
        src.value = ramen.image; // set src attribute image url
        img.setAttributeNode(src); // give img element a src attribute

        img.addEventListener("click", () => { // on click show ramen's information
            detailImage.setAttribute("src", `${src.value}`); // show image
            ramenName.textContent = `${ramen.name}`; // show name
            ramenRestaurant.textContent = `${ramen.restaurant}`; // show restaurant
            ramenRating.textContent = `${ramen.rating}`; // show rating
            ramenComment.textContent = `${ramen.comment}`; // show comment
        })

        ramenImage.appendChild(img); // give ramen-menu a img element   
    });
}

// get form element with new-ramen-id, add event listener with submit function
document.getElementById("new-ramen").addEventListener("submit", event => {
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify ({
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target.comment.value
      })
    })
})

document.addEventListener('DOMContentLoaded', function() {
    fetchRamens();
});