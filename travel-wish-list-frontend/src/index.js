const BACKEND_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${BACKEND_URL}/itineraries`)
    .then((response) => response.json())
    .then(function (itineraries) {
      itineraries.forEach(function (itinerary) {
        const i = new Itinerary(itinerary);
        i.append();
      });
    });
});

class Itinerary {
  constructor({ id, name, activities }) {
    this.id = id;
    this.name = name;
    this.activities = activities;
    this.div = document.createElement("div");
    this.ul = document.createElement("ul");
  }

  //method
  append = () => {
    //create div w/ itinerary
    this.div.classList.add("card", "pink", "accent-2"); //For materialize card https://materializecss.com/cards.html
    // make p tag (paragraph)
    const title = document.createElement("p");
    title.innerText = this.name;
    this.div.appendChild(title);
    //make add button
    const button = document.createElement("a");
    button.classList.add(
      "btn-floating",
      "halfway-fab",
      "waves-effect",
      "waves-light",
      "red"
    );
    //https://materializecss.com/buttons.html
    this.div.appendChild(button);

    //sort button
    const sortButton = document.createElement("button");
    sortButton.classList.add("button");
    sortButton.innerHTML = "Sort";
    this.div.appendChild(sortButton);

    sortButton.addEventListener("click", this.sortButtonClicked);
    //i tag (icon)
    const addIcon = document.createElement("i");
    addIcon.classList.add("material-icons"); //https://materializecss.com/icons.html
    addIcon.innerText = "add";
    button.appendChild(addIcon);

    //add event listener to add button
    button.addEventListener("click", this.activityButtonClicked);

    //content
    const content = document.createElement("div");
    content.classList.add("card-content");
    this.div.appendChild(content);

    //ul
    this.ul.classList.add("collection");
    this.ul.id = `itinerary-${this.id}`;
    content.appendChild(this.ul);

    this.activities.forEach(this.appendActivity);
    //appends added items
    document.body.appendChild(this.div);
  };
  //handoff from itinerary to activity
  appendActivity = (activity) => {
    const act = new Activity(activity);
    act.append(this.ul);
  };
  //function/method.
  activityButtonClicked = (event) => {
    console.log("clicked");
    //https://materializecss.com/text-inputs.html
    const activityText = document.createElement("input");
    activityText.classList.add("validate");
    activityText.setAttribute("placeholder", "Activity");
    activityText.setAttribute("type", "text");
    this.div.appendChild(activityText);
    activityText.focus();
    //every key pressed
    activityText.addEventListener("keypress", this.activityTextKeyPressed);
  };

  //sort button clicked
  sortButtonClicked = (event) => {
    console.log("sort clicked");
    //materializecss.com/buttons.html

    //     <a class="waves-effect waves-light btn">button</a>
    // <a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>button</a>
    // <a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a>
  };

  //enter
  activityTextKeyPressed = (event) => {
    if (event.key === "Enter") {
      console.log(this);
      this.addActivity(event.target.value);

      this.div.removeChild(event.target);
    }
  };

  addActivity = (name) => {
    const activityData = {
      name: name,
    };

    const configObj = {
      //verb, path, head, body
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(activityData),
    };

    fetch(`${BACKEND_URL}/itineraries/${this.id}/activities`, configObj) //passing configObj
      .then(function (response) {
        return response.json();
      })
      .then(
        function (activity) {
          const act = new Activity(activity);
          act.append(this.ul);
        }.bind(this)
      );
  };
}

class Activity {
  constructor({ id, name, itinerary_id }) {
    this.id = id;
    this.name = name;
    this.itinerary_id = itinerary_id;
  }
  //method appending rows
  append = (parent) => {
    const li = document.createElement("li"); //https://materializecss.com/collections.html
    li.classList.add("collection-item");
    parent.appendChild(li);
    this.parent = parent;
    this.child = li;

    //div
    const div = document.createElement("div");
    div.innerText = this.name;
    li.appendChild(div);

    //a href (anchor)
    const a = document.createElement("a");
    a.setAttribute("href", "#!");
    a.classList.add("secondary-content");
    div.appendChild(a);

    a.addEventListener("click", this.deleteButtonClicked);

    //i for remove button
    const icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.innerText = "clear";
    a.appendChild(icon);
  };
  deleteButtonClicked = (event) => {
    console.log("clicked delete");
    this.removeFromItinerary();
    this.parent.removeChild(this.child);
  };

  removeFromItinerary = () => {
    const configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(
      `${BACKEND_URL}/itineraries/${this.itinerary_id}/activities/${this.id}`,
      configObj
    ).then(function (response) {
      console.log("Success");
    });
  };
}
