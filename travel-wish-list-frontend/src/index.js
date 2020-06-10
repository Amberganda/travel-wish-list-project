const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", function () {
    fetch(`${BACKEND_URL}/itineraries`)
        .then(response => response.json())
        .then(function (itineraries) {
            itineraries.forEach(appendItinerary);
        })
})

function appendItinerary(itinerary) {
    const div = document.createElement("div")
    div.innerHTML = itinerary.name
    div.classList.add("card", "grey")

    document.body.appendChild(div)




}