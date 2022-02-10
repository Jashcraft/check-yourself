//Global access variables and page elements
var stateSelectEl = document.querySelector('#states');
var stateSubmitEl = document.querySelector('#submit-state');
var userState;
var userMood;
var cardsSection = document.querySelector("#left-card-container");
var sidebarContainer = document.querySelector("#right-suggestions-container");
var suggestionButtonEl = document.querySelector(".suggestionButton");
var introContainer = document.querySelector("#intro-container");
var todayDate = moment().format("L");


//LocalStorage handling for persistent card data
var userMoodCards;
if (JSON.parse(localStorage.getItem("moodCards")) === null) {
    userMoodCards = [];
}
else {
    userMoodCards = JSON.parse(localStorage.getItem("moodCards"));
}

for (var i = 0; i < states.length; i++) {
    var optionEl = document.createElement("option")
    optionEl.value = states[i].abbreviation;
    optionEl.textContent = states[i].name;

    stateSelectEl.appendChild(optionEl);
};

var boredFetch = function() {
    fetch("http://www.boredapi.com/api/activity?type=cooking")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("Calling boredAPI...")
        console.log(data);
    });
}

for (var i = 0; i < states.length; i++) {
    var optionEl = document.createElement("option")
    optionEl.value = states[i].abbreviation;
    optionEl.textContent = states[i].name;

    stateSelectEl.appendChild(optionEl);
};

//debugger;

var seatFetch = function() {
    fetch("https://api.seatgeek.com/2/events/?venue.state=" + userState + "&client_id=MjU1NTAzMTF8MTY0MzU5OTc0MS41NjYxMzg1&client_secret=b63b8c19928eaec5bc232406dd1a3f9b736e95c54062f429dee6e000c044de9a&per_page=5")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log("Calling seatGeek API...");
        for (var i = 0; i < data.events.length; i++){
            var eventTitle = data.events[i].title;
            var eventTime = moment(data.events[i].datetime_local).format("dddd, MMMM Do YYYY, h:mm:ss a");
            var venName = data.events[i].venue.name;
            var venAddr = data.events[i].venue.address;
            var venExtAddr = data.events[i].venue.extended_address;
            var venUrl = data.events[i].venue.url;
            var perfImg = data.events[i].performers[0].image;
        
        
            var carouselItem = document.createElement("div");
            if (i === 0){
                carouselItem.classList = "carousel-item active relative float-left w-full";
            } else {
                carouselItem.classList = "carousel-item relative float-left w-full";
            }
            
            var carouselImg = document.createElement("img");
            carouselImg.src = perfImg;
            carouselImg.classList = "rounded-lg transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl";

            var carouselText = document.createElement("div");
            carouselText.classList = "md:block absolute inset-x-1/4 text-center";

            var carouselEventTitle = document.createElement("h2");
            carouselEventTitle.className = "mt-12";
            carouselEventTitle.textContent = eventTitle;

            var carouselEventDate = document.createElement("h3");
            carouselEventDate.textContent = eventTime;

            var carouselVenueName = document.createElement("h4");
            carouselVenueName.textContent = venName;

            var carouselStreet = document.createElement("p");
            carouselStreet.textContent = venAddr

            var carouselCity = document.createElement("p");
            carouselCity.textContent = venExtAddr;

            var carouselUrl = document.createElement("a");
            carouselUrl.href = venUrl;

            var carouselTicketButton = document.createElement("button");
            carouselTicketButton.type = "button";
            carouselTicketButton.classList = "inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
            carouselTicketButton.textContent = "Tickets";

            carouselUrl.appendChild(carouselTicketButton);
            carouselText.appendChild(carouselEventTitle);
            carouselText.appendChild(carouselEventDate);
            carouselText.appendChild(carouselVenueName);
            carouselText.appendChild(carouselStreet);
            carouselText.appendChild(carouselCity);
            carouselText.appendChild(carouselUrl);

            carouselItem.appendChild(carouselImg);
            carouselItem.appendChild(carouselText);

            $(".carousel-inner").append(carouselItem);
        };
    })

    .catch(err => {
        console.error(err);
    });

};

//Functions to handle localStorage
var loadCards = function() {
    console.log(JSON.parse(localStorage.getItem("cards")));
};

var storeCards = function() {
    localStorage.setItem("cards", JSON.stringify(userMoodCards));
    loadCards();
};

//Function that generates all the elements for the sidebar
var generateSidebar = function() {

    //Check whether the sidebarTitle already exists...
    //If not, create it and style it
    if (!document.querySelector("#sidebar-title")) {
        console.log("No sidebar h3 elements.");
        var sidebarSection = $(sidebarContainer).children("section");
        var sidebarTitle = document.createElement("h3");
        sidebarContainer.setAttribute("class", "bg-green-200 w-1/3");
        sidebarTitle.textContent = "Activity Suggestion:";
        sidebarTitle.setAttribute("class", "font-lg text-white bg-green-400 text-center p-2 w-100%");
        sidebarTitle.setAttribute("id", "sidebar-title");
        sidebarSection.append(sidebarTitle);
    }

    //Below we can now append elements from the suggestion API calls

}


var generateCard = function(moodText, moodScore) {
    //Generate the elements for the main div, the header, description, score, and button
    //div container
    var cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "card basis-full md:basis-1/3 flex-wrap shrink-0 p-3 bg-blue-300 w-1/4 flex flex-col justify-between items-center m-1");

    //card header
    var cardHeader = document.createElement("h3");
    cardHeader.setAttribute("class", "text-lg p-2 font-bold italic bg-blue-400 text-center w-100% text-white");
    cardHeader.textContent = "Entry from "+todayDate;

    //card brief description
    var briefDescription = moodText.split("");
    //Only display the first 50 characters of the user's description for a given day
    if (briefDescription.length > 150) {
        briefDescription = briefDescription.splice(0, 150).join("")+"...";
    }
    else {
        briefDescription = briefDescription.join("");
    }
    var cardDescription = document.createElement("p");
    cardDescription.textContent = briefDescription;

    //card score
    var cardScore = document.createElement("h3");
    cardScore.textContent = "Mood Score: "+moodScore;

    //card button "See Suggestions"
    var suggestionButton = document.createElement("button");
    suggestionButton.setAttribute("class", "suggestionButton bg-blue-500 font-bold p-2 my-2 rounded hover:bg-blue-800 text-white");
    suggestionButton.textContent = "See Suggestions";

    //Append items to the card container
    cardContainer.appendChild(cardHeader);
    cardContainer.appendChild(cardDescription);
    cardContainer.appendChild(cardScore);
    cardContainer.appendChild(suggestionButton);

    //Add event listener
    suggestionButton.addEventListener("click", function(data) {
        // clears out existing crousel that may already be displayed 
        $(".carousel-inner").empty();

        //Evaluate user mood to determine which fetch is used to populate the card
        if (moodScore >= 3) {
            seatFetch();
        }
        else {
            boredFetch();
        }

    });

    //Add the contents of the mood card to localStorage
    userMoodCards.push({date: todayDate, score: moodScore, description: moodText});
    console.log("Appended to userMoodCards.  Now contains:");
    console.log(userMoodCards);
    storeCards();

    //Append the card container to the cardsDiv element
    var cardsDiv = document.querySelector("#cardsDiv");
    cardsDiv.appendChild(cardContainer);
    cardsDiv.setAttribute("class", "min-w-full flex flex-wrap justify-center p-2 bg-red-200");

    //At this point we can add styling to the sidebar div
    generateSidebar();

}

var loadMoodForm = function() {

    //Create the new page structure...
    //Remove old elements from the page
    introContainer.removeChild(document.querySelector("#intro-content"));

    //Add h2 "How are you feeling today?"
    var moodTitle = document.createElement("h2");
    moodTitle.textContent = "How are you feeling today?";
    moodTitle.setAttribute("class", "mb-3");
    introContainer.appendChild(moodTitle);

    //Add the form to hold the textarea, dropdown, and submit
    var moodForm = document.createElement("form");
    moodForm.setAttribute("id", "moodForm");
    moodForm.setAttribute("class", "min-h-1/2 flex flex-col justify-center items-center");

    var moodTextArea = document.createElement("textarea");
    moodTextArea.setAttribute("id", "moodTextArea");
    moodTextArea.setAttribute("class", "mb-8");
    moodTextArea.setAttribute("placeholder", "Describe Your Mood");

    //Add label "Rate your mood"
    var moodRatingLabel = document.createElement("label");
    moodRatingLabel.setAttribute("for", "moodRating");
    moodRatingLabel.setAttribute("id", "moodRatingLabel");
    moodRatingLabel.setAttribute("class", "min-w-full text-center mb-2");
    moodRatingLabel.textContent = "Rate your mood today";

    //Add dropdown to hold number values
    var moodRating = document.createElement("select");
    moodRating.setAttribute("name", "moodRating");
    moodRating.setAttribute("id", "moodRating");
    moodRating.setAttribute("class", "w-1/3 text-center");

    //Append options to select
    for (var i = 0; i < 5; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", i+1);
        option.textContent = i+1;
        //Set styling with classes
        moodRating.appendChild(option);
    }

    //Add submit button
    var moodSubmitButton = document.createElement("button");
    moodSubmitButton.setAttribute("type", "submit");
    moodSubmitButton.setAttribute("id", "moodSubmitButton");
    moodSubmitButton.textContent = "Submit";
    moodSubmitButton.setAttribute("class", "my-4 p-1.5 bg-blue-500 text-white font-bold text-center hover:bg-blue-700 rounded");

    //Append elements to the form
    moodForm.appendChild(moodTextArea);
    moodForm.appendChild(moodRatingLabel);
    moodForm.appendChild(moodRating);
    moodForm.appendChild(moodSubmitButton);

    //Append form to page
    introContainer.appendChild(moodForm);
    //Also append empty divs for ease of styling when cards and sidebar are appended to it
    var cardsDiv = document.createElement("div");
    cardsDiv.setAttribute("id", "cardsDiv");
    var sidebarDiv = document.createElement("div");
    sidebarDiv.setAttribute("id", "sidebarDiv");

    cardsSection.appendChild(cardsDiv);
    sidebarContainer.appendChild(sidebarDiv);

    //Call the generateCard function with parameters for state, moodText, and moodScore
    //This should eventually be wired to a submit event listener, but for testing will be called.
    introContainer.querySelector("#moodForm").addEventListener("submit", function(event) {
        event.preventDefault();
        userMoodText = moodTextArea.value;
        userMood = moodRating.value;

        generateCard(userMoodText, userMood);

        // Clear the values for userMoodText and userMood
        moodTextArea.value = "";
        moodRating.value = ""
    });
};

var logState = function() {

    //Log the state input to a variable so it can be accessed on future logins
    userState = stateSelectEl.value;

    //Assign the userState variable a new value based on the input from the intro section
    localStorage.setItem("userState", JSON.stringify({state: userState}));
    loadMoodForm();
}

//If the user has not already provided their state of residence, intro screen should appear.
if (JSON.parse(localStorage.getItem("userState")) === null) {
    console.log("No state has been selected");
}
//Otherwise, it should load the existing cards from localStorage
else {
    userState = JSON.parse(localStorage.getItem("userState"));
    logState();
};

//listener for states submit button
stateSubmitEl.addEventListener("click", logState);