var stateSelectEl = document.querySelector('#states');
var submitBtnEl = document.querySelector('#submit-city');
var globalState  = stateSelectEl.value; //rename this

//More element variables for global access
var mainPageEl = document.querySelector("main");

var todayDate = moment().format("L");

//Data values for user info like state of residence and card info
var userState = stateSelectEl.value;
var userMood;

var userMoodCards;
if (JSON.parse(localStorage.getItem("moodCards")) === null) {
    console.log("No user cards stored.");
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

submitBtnEl.addEventListener('click', function (event) {
    // console.log("helloooo... Infini-dagger!!");
    event.preventDefault;
    var stateVal = stateSelectEl.value;
    userState = stateVal;

    fetch("https://api.seatgeek.com/2/events/?venue.state=" + stateVal + "&client_id=MjU1NTAzMTF8MTY0MzU5OTc0MS41NjYxMzg1&client_secret=b63b8c19928eaec5bc232406dd1a3f9b736e95c54062f429dee6e000c044de9a&per_page=5")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        });

        fetch("http://www.boredapi.com/api/activity?type=cooking")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });

for (var i = 0; i < states.length; i++) {
    var optionEl = document.createElement("option")
    optionEl.value = states[i].abbreviation;
    optionEl.textContent = states[i].name;

    stateSelectEl.appendChild(optionEl);
};

submitBtnEl.addEventListener('click', function (event) {
    // console.log("helloooo... Infini-dagger!!");
    event.preventDefault;
    $(".carousel-inner").empty();
    var stateVal = stateSelectEl.value;

    fetch("https://api.seatgeek.com/2/events/?venue.state=" + stateVal + "&client_id=MjU1NTAzMTF8MTY0MzU5OTc0MS41NjYxMzg1&client_secret=b63b8c19928eaec5bc232406dd1a3f9b736e95c54062f429dee6e000c044de9a&per_page=5")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
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
                carouselImg.classList = "scale-150 rounded-lg transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl";

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

        fetch("http://www.boredapi.com/api/activity?type=relaxation")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });

});

//Handler for the cityButton on the intro screen

var generateCard = function(moodText, moodScore) {
    //Generate the elements for the main div, the header, description, score, and button
    //div container
    var cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "card");

    //card header
    var cardHeader = document.createElement("h3");
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
    suggestionButton.setAttribute("class", "suggestionButton");
    suggestionButton.textContent = "See Suggestions";

    //Append items to the card container
    cardContainer.appendChild(cardHeader);
    cardContainer.appendChild(cardDescription);
    cardContainer.appendChild(cardScore);
    cardContainer.appendChild(suggestionButton);

    //Append the card container to the cardsDiv element
    var cardsDiv = document.querySelector("#cardsDiv");
    cardsDiv.appendChild(cardContainer);

}

var loadMoodForm = function() {

    //Create the new page structure...
    //Remove old elements from the page
    mainPageEl.removeChild(document.querySelector("#intro-content"));

    //Add h2 "How are you feeling today?"
    var moodTitle = document.createElement("h2");
    moodTitle.textContent = "How are you feeling today?";
    moodTitle.setAttribute("class", ""); //Add necessary styling here
    mainPageEl.appendChild(moodTitle);

    //Add the form to hold the textarea, dropdown, and submit
    var moodForm = document.createElement("form");
    moodForm.setAttribute("id", "moodForm");

    //Add textarea "Describe your mood"
    var moodTextLabel = document.createElement("label");
    moodTextLabel.setAttribute("for", "moodTextArea");
    moodTextLabel.setAttribute("id", "moodTextLabel"); 
    moodTextLabel.setAttribute("class", ""); //Set classes for the label
    moodTextLabel.textContent = "Describe your mood";

    var moodTextArea = document.createElement("textarea");
    moodTextArea.setAttribute("id", "moodTextArea");
    moodTextArea.setAttribute("class", ""); //set classes for textArea

    //Add label "Rate your mood"
    var moodRatingLabel = document.createElement("label");
    moodRatingLabel.setAttribute("for", "moodRating");
    moodRatingLabel.setAttribute("id", "moodRatingLabel");
    moodRatingLabel.setAttribute("class", "");
    moodRatingLabel.textContent = "Rate your mood today";

    //Add dropdown to hold number values
    var moodRating = document.createElement("select");
    moodRating.setAttribute("name", "moodRating");
    moodRating.setAttribute("id", "moodRating");

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

    //Append elements to the form
    moodForm.appendChild(moodTextLabel);
    moodForm.appendChild(moodTextArea);
    moodForm.appendChild(moodRatingLabel);
    moodForm.appendChild(moodRating);
    moodForm.appendChild(moodSubmitButton);

    //Append form to page
    mainPageEl.appendChild(moodForm);
    //Also append empty divs for ease of styling when cards and sidebar are appended to it
    var cardsDiv = document.createElement("div");
    cardsDiv.setAttribute("id", "cardsDiv");
    var sidebarDiv = document.createElement("div");
    sidebarDiv.setAttribute("id", "sidebarDiv");

    mainPageEl.appendChild(cardsDiv);
    mainPageEl.appendChild(sidebarDiv);

    //Call the generateCard function with parameters for state, moodText, and moodScore
    //This should eventually be wired to a submit event listener, but for testing will be called.
    mainPageEl.querySelector("#moodForm").addEventListener("submit", function(event) {
        event.preventDefault();
        userMoodText = moodTextArea.value;
        userMood = moodRating.value;

        // Clear the values for userMoodText and userMood
        moodTextArea.value = "";
        moodRating.value = ""
        
        generateCard(userMoodText, userMood);
    });
};

var logCity = function() {

    //Log the city input to a variable so it can be accessed on future logins
    //This should eventually pull the value from the intro screen's form.
    console.log("Logged user state of residence.");

    loadMoodForm();
}

//listener for the city button
var cityButtonEl = document.querySelector("#submit-city");
cityButtonEl.addEventListener("click", logCity);

//Listener for the "see suggestions" buttons within each card
mainPageEl.addEventListener("click", function(event) {   
    if (event.target === document.querySelector(".suggestionButton")) {
        //function call here
        console.log("Loading suggestions to sidebar...");
    };
});
