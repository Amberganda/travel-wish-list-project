const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", function () {
    fetch(`${BACKEND_URL}/itineraries`)
        .then(response => response.json())
        .then(function (itineraries) {
            itineraries.forEach(function (itinerary) {
                const i = new Itinerary(itinerary)
                i.append()
            })
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
        this.div = document.createElement('div')
        this.ul = document.createElement('ul')
    }
    //method
    append = () => {
        //create div w/ itinerary names
        this.div.classList.add("card", "pink", "accent-2")
        // make p tag
        const title = document.createElement('p')
        title.innerText = this.name
        this.div.appendChild(title)
        //make add button
        const button = document.createElement('a')
        button.classList.add("btn-floating", "halfway-fab", "waves-effect", "waves-light", "red")
        this.div.appendChild(button)

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
        this.div.appendChild(content)

        //ul
        this.ul.classList.add('collection')
        this.ul.id = `itinerary-${this.id}`
        content.appendChild(this.ul)

        this.activities.forEach(this.appendActivity);

        document.body.appendChild(this.div)
    }
    //handoff 
    appendActivity = (activity) => {
        const act = new Activity(activity)
        act.append(this.ul)
    }

    activityButtonClicked = (event) => {
        console.log("clicked")
        const activityText = document.createElement('input')
        activityText.classList.add('validate')
        activityText.setAttribute('placeholder', 'Activity')
        activityText.setAttribute('type', 'text')
        this.div.appendChild(activityText)
        //enter
        activityText.addEventListener('keypress', this.activityTextKeyPressed)

    }

    activityTextKeyPressed = (event) => {
        if (event.key === 'Enter') {
            console.log(this)
            this.addActivity(event.target.value)

            this.div.removeChild(event.target)
        }

    }

    addActivity = (name) => {
        const activityData = {
            name: name
        }

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(activityData)
        }

        fetch(`${BACKEND_URL}/itineraries/${this.id}/activities`, configObj)
            .then(function (response) {
                return response.json()
            })
            .then(function (activity) {
                const act = new Activity(activity)
                act.append(this.ul)
            }.bind(this))


    }
}

class Activity {
    constructor({
        id,
        name,
        itinerary_id
    }) {
        this.id = id;
        this.name = name;
        this.itinerary_id = itinerary_id;
    }
    //method appending rows
    append = (parent) => {
        const li = document.createElement('li')
        li.classList.add('collection-item')
        parent.appendChild(li)
        this.parent = parent
        this.child = li

        //div
        const div = document.createElement('div')
        div.innerText = this.name
        li.appendChild(div)

        //a href
        const a = document.createElement('a')
        a.setAttribute('href', '#!')
        a.classList.add('secondary-content')
        div.appendChild(a)

        a.addEventListener('click', this.deleteButtonClicked)

        //i for remove button
        const icon = document.createElement('i')
        icon.classList.add('material-icons')
        icon.innerText = 'clear'
        a.appendChild(icon)



    }
    deleteButtonClicked = (event) => {
        console.log("clicked delete")
        this.removeFromItinerary()
        this.parent.removeChild(this.child)
    }

    removeFromItinerary = () => {
        const configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        };
        fetch(`${BACKEND_URL}/itineraries/${this.itinerary_id}/activities/${this.id}`, configObj)
            .then(function (response) {
                console.log("Success")
            })

    }
}