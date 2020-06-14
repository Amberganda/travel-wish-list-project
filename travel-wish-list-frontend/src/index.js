const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", function () {
    fetch(`${BACKEND_URL}/itineraries`)
        .then(response => response.json())
        .then(function (itineraries) {
            itineraries.forEach(function (itinerary) {
                const i = new Itinerary(itinerary)
                i.append()
            })
            itineraries.forEach(appendItinerary);
        })

})

class Itinerary {
    constructor({
        id,
        name,
        activities
    }) {
        this.id = id;
        this.name = name;
        this.activities = activities;
    }
    //method
    append() {
        //create div w/ itinerary names
        const div = document.createElement('div')
        div.classList.add("card", "pink", "accent-2")
        // make p tag
        const title = document.createElement('p')
        title.innerText = this.name
        div.appendChild(title)
        //make add button
        const button = document.createElement('a')
        button.classList.add("btn-floating", "halfway-fab", "waves-effect", "waves-light", "red")
        div.appendChild(button)

        //i tag
        const addIcon = document.createElement('i')
        addIcon.classList.add('material-icons')
        addIcon.innerText = "add"
        button.appendChild(addIcon)

        //add event listener to add button
        button.addEventListener('click', this.activityButtonClicked)

        //content
        const content = document.createElement('div')
        content.classList.add('card-content')
        div.appendChild(content)

        //ul
        const ul = document.createElement('ul')
        ul.classList.add('collection')
        ul.id = `itinerary-${this.id}`
        content.appendChild(ul)

        this.activities.forEach(function (activity) {
            console.log(activity)
        })

        document.body.appendChild(div)
    }

    activityButtonClicked(event) {
        console.log("clicked")
    }
}

function appendItinerary(itinerary) {
    //create div w/ Itinerary Names
    const div = document.createElement('div')
    div.classList.add("card", "indigo", "accent-2")

    // make p tag
    const title = document.createElement('p')
    title.innerText = itinerary.name
    div.appendChild(title)

    //make add button
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

    // add event listener to add button
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
                div.removeChild(activityText)
            }
        })
    });

    const content = document.createElement('div')
    content.classList.add('card-content')
    div.appendChild(content)

    //ul
    const ul = document.createElement('ul')
    ul.classList.add('collection')
    ul.id = `itinerary-${itinerary.id}`
    content.appendChild(ul)


    itinerary.activities.forEach(function (activity) {
        // <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        const li = document.createElement('li')
        li.classList.add('collection-item')

        //attach to ul
        ul.appendChild(li)

        //div
        const activityDiv = document.createElement('div')
        activityDiv.innerText = activity.name
        li.appendChild(activityDiv)

        //a href
        const a = document.createElement('a')
        a.setAttribute('href', '#!')
        a.classList.add('secondary-content')
        activityDiv.appendChild(a)


        a.addEventListener('click', function (event) {
            removeActivityFromItinerary(activity)
            ul.removeChild(li)
        })

        //i for remove button
        const icon = document.createElement('i')
        icon.classList.add('material-icons')
        icon.innerText = 'clear'
        a.appendChild(icon)

    })



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
            addActivityToItinerary(activity)
        })
}


function addActivityToItinerary(activity) {
    console.log(activity)
    const ul = document.getElementById(`itinerary-${activity.itinerary_id}`)

    const li = document.createElement('li')
    li.classList.add('collection-item')
    li.innerText = activity.name

    //attach to ul
    ul.appendChild(li)

}

function removeActivityFromItinerary(activity) {
    // const activityItem = document.querySelector()
    const activityItem = document.getElementById(`itinerary-${activity.itinerary_id}`)



    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    };
    fetch(`${BACKEND_URL}/itineraries/${activity.itinerary_id}/activities/${activity.id}`, configObj)
        .then(function (response) {
            console.log("Success")
        })
}