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
    // addIcon.setAttribute("data-itinerary-id", itinerary.id)
    // addIcon.setAttribute("data-itinerary-div", div)
    addIcon.classList.add("material-icons")
    addIcon.innerText = "add"
    button.appendChild(addIcon)
    // a class = "btn-floating halfway-fab waves-effect waves-light red" > < i class = "material-icons" > add < /i></a >

    // add event listener to button
    button.addEventListener('click', function (event) {
        const activityText = document.createElement('input')
        activityText.classList.add("validate")
        activityText.setAttribute("placeholder", "Placeholder")
        activityText.setAttribute("type", "text")
        div.appendChild(activityText)
        //enter 
        activityText.addEventListener('keypress', function (el) {
            if (el.key === 'Enter') {
                addActivity(itinerary.id, activityText.value)
            }
        })
    });



    //build me up buttercup
    document.body.appendChild(div)

}

function addActivity(itineraryId, activityValue) {
    // console.log("added activity button")
    // const itineraryId = event.target.dataset.itineraryId
    console.log(itineraryId)
    console.log(activityValue)

    // event.target.dataset.itineraryDiv.appendChild(activityText)
    // <input placeholder="Placeholder" id="first_name" type="text" class="validate">

    const activityData = {
        name: activityValue
    }

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(activityData)
    }

    fetch(`${BACKEND_URL}/itineraries/${itineraryId}/activities`, configObj)
        .then(function (response) {
            return response.json()
        })
        .then(function (activity) {
            console.log(activity)
        })
}