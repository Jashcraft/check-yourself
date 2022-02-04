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
//         "abbreviation": "AS"
//     },
//     {
//         "name": "Arizona",
//         "abbreviation": "AZ"
//     },
//     {
//         "name": "Arkansas",
//         "abbreviation": "AR"
//     },
//     {
//         "name": "California",
//         "abbreviation": "CA"
//     },
//     {
//         "name": "Colorado",
//         "abbreviation": "CO"
//     },
//     {
//         "name": "Connecticut",
//         "abbreviation": "CT"
//     },
//     {
//         "name": "Delaware",
//         "abbreviation": "DE"
//     },
//     {
//         "name": "District Of Columbia",
//         "abbreviation": "DC"
//     },
//     {
//         "name": "Federated States Of Micronesia",
//         "abbreviation": "FM"
//     },
//     {
//         "name": "Florida",
//         "abbreviation": "FL"
//     },
//     {
//         "name": "Georgia",
//         "abbreviation": "GA"
//     },
//     {
//         "name": "Guam",
//         "abbreviation": "GU"
//     },
//     {
//         "name": "Hawaii",
//         "abbreviation": "HI"
//     },
//     {
//         "name": "Idaho",
//         "abbreviation": "ID"
//     },
//     {
//         "name": "Illinois",
//         "abbreviation": "IL"
//     },
//     {
//         "name": "Indiana",
//         "abbreviation": "IN"
//     },
//     {
//         "name": "Iowa",
//         "abbreviation": "IA"
//     },
//     {
//         "name": "Kansas",
//         "abbreviation": "KS"
//     },
//     {
//         "name": "Kentucky",
//         "abbreviation": "KY"
//     },
//     {
//         "name": "Louisiana",
//         "abbreviation": "LA"
//     },
//     {
//         "name": "Maine",
//         "abbreviation": "ME"
//     },
//     {
//         "name": "Marshall Islands",
//         "abbreviation": "MH"
//     },
//     {
//         "name": "Maryland",
//         "abbreviation": "MD"
//     },
//     {
//         "name": "Massachusetts",
//         "abbreviation": "MA"
//     },
//     {
//         "name": "Michigan",
//         "abbreviation": "MI"
//     },
//     {
//         "name": "Minnesota",
//         "abbreviation": "MN"
//     },
//     {
//         "name": "Mississippi",
//         "abbreviation": "MS"
//     },
//     {
//         "name": "Missouri",
//         "abbreviation": "MO"
//     },
//     {
//         "name": "Montana",
//         "abbreviation": "MT"
//     },
//     {
//         "name": "Nebraska",
//         "abbreviation": "NE"
//     },
//     {
//         "name": "Nevada",
//         "abbreviation": "NV"
//     },
//     {
//         "name": "New Hampshire",
//         "abbreviation": "NH"
//     },
//     {
//         "name": "New Jersey",
//         "abbreviation": "NJ"
//     },
//     {
//         "name": "New Mexico",
//         "abbreviation": "NM"
//     },
//     {
//         "name": "New York",
//         "abbreviation": "NY"
//     },
//     {
//         "name": "North Carolina",
//         "abbreviation": "NC"
//     },
//     {
//         "name": "North Dakota",
//         "abbreviation": "ND"
//     },
//     {
//         "name": "Northern Mariana Islands",
//         "abbreviation": "MP"
//     },
//     {
//         "name": "Ohio",
//         "abbreviation": "OH"
//     },
//     {
//         "name": "Oklahoma",
//         "abbreviation": "OK"
//     },
//     {
//         "name": "Oregon",
//         "abbreviation": "OR"
//     },
//     {
//         "name": "Palau",
//         "abbreviation": "PW"
//     },
//     {
//         "name": "Pennsylvania",
//         "abbreviation": "PA"
//     },
//     {
//         "name": "Puerto Rico",
//         "abbreviation": "PR"
//     },
//     {
//         "name": "Rhode Island",
//         "abbreviation": "RI"
//     },
//     {
//         "name": "South Carolina",
//         "abbreviation": "SC"
//     },
//     {
//         "name": "South Dakota",
//         "abbreviation": "SD"
//     },
//     {
//         "name": "Tennessee",
//         "abbreviation": "TN"
//     },
//     {
//         "name": "Texas",
//         "abbreviation": "TX"
//     },
//     {
//         "name": "Utah",
//         "abbreviation": "UT"
//     },
//     {
//         "name": "Vermont",
//         "abbreviation": "VT"
//     },
//     {
//         "name": "Virgin Islands",
//         "abbreviation": "VI"
    },
    {     "name": "Virginia",
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

//Handler for the cityButton on the intro screen