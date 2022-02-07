var stateSelectEl = document.querySelector('#state');
var submitBtnEl = document.querySelector('#submit');

//More element variables for global access
var mainPageEl = document.querySelector("main");

//Data values for user info like state of residence and card info
var userState = "";
var userMood = 5;
var userMoodText = "When I was, a young lad, my father... took me into the city.  To see a marching band.  He said son when... you grow up.  Something something blah blah blah black paraaaaaaaaaade!";
var date = "02/02/2022";

var userMoodCards;
if (JSON.parse(localStorage.getItem("moodCards")) === null) {
    console.log("No user cards stored.");
    userMoodCards = [];
}
else {
    userMoodCards = JSON.parse(localStorage.getItem("moodCards"));
}


var states = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
]

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

});

// Handler for the cityButton on the intro screen

function generateCard(moodText, moodScore) {
    //Generate the elements for the main div, the header, description, score, and button
    //div container
    var cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "card");

    //card header
    var cardHeader = document.createElement("h3");
    cardHeader.textContent = "Entry from " + date;

    //card brief description
    var briefDescription = moodText.split("");
    //Only display the first 50 characters of the user's description for a given day
    console.log("Brief description (full):", briefDescription);
    if (briefDescription.length > 50) {
        briefDescription = briefDescription.splice(0, 50).join("") + "...";
        console.log("Brief Description (Shortened): ", briefDescription);
    }
    var cardDescription = document.createElement("p");
    cardDescription.textContent = briefDescription;

    //card score
    var cardScore = document.createElement("h3");
    cardScore.textContent = "Mood Score: " + moodScore;

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
    mainPageEl.removeChild(document.querySelector(".container"));

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
        generateCard(userMoodText, userMood);
    });
    // generateCard(userMoodText, userMood);

};

var logCity = function() {

    //Log the city input to a variable so it can be accessed on future logins
    //This should eventually pull the value from the intro screen's form.
    console.log("Logged user state of residence.");

    loadMoodForm();
}

//listener for the city button
var cityButtonEl = document.querySelector(".cityButton");
cityButtonEl.addEventListener("click", logCity);

//Listener for the "see suggestions" buttons within each card
mainPageEl.addEventListener("click", function(event) {   
    if (event.target === document.querySelector(".suggestionButton")) {
        //function call here
        console.log("Loading suggestions to sidebar...");
    };
});
