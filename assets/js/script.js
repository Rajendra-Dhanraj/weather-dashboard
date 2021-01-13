// var created to get city weather info, use this function to fetch
var getCityWeather = function(cityname){

    //format the github api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityname + '&appid=cb75ebe43da83650fe06f37d2f1321bf';
    

    // make a request to the URL
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};



var searchFormEl = document.querySelector("#search-form");
var cityNameEl = document.querySelector("#city-name");

var formSubmitHandler = function (event){
event.preventDefault();
// get value from input element
var cityname = cityNameEl.value.trim();

if (cityname) {
    getCityWeather(cityname);
    cityNameEl.value = "";
    } else {
        alert("Please enter a city")
    }
};

searchFormEl.addEventListener("submit", formSubmitHandler);

