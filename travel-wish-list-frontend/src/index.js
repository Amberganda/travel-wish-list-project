const BACKEND_URL = 'http://localhost:3000';
// 

document.addEventListener("DOMContentLoaded", function () {
    fetch(`${BACKEND_URL}/itineraries`)
        .then(response => response.json())
        .then(function (itineraries) {
            itineraries.forEach(appendItinerary);
        })
})

function appendItinerary(itinerary) {
    //create div w/ Itinerary Names
    const div = document.createElement('div')
    div.classList.add("card", "indigo", "accent-2")

    // make p tag
    const title = document.createElement('p')
    title.innerText = itinerary.name
    div.appendChild(title)

    //make button
    const button = document.createElement("a")
    button.classList.add("btn-floating", "halfway-fab", "waves-effect", "waves-light", "red")
    div.appendChild(button)

    const addIcon = document.createElement('i')
    addIcon.classList.add("material-icons")
    addIcon.innerText = "add"
    button.appendChild(addIcon)
    // a class = "btn-floating halfway-fab waves-effect waves-light red" > < i class = "material-icons" > add < /i></a >

    //build me up buttercup
    document.body.appendChild(div)




}