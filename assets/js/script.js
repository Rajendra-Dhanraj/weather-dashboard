// var created to get city weather info
var getCityWeather = function (cityname) {
  //format the open weather api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityname +
    "&appid=cb75ebe43da83650fe06f37d2f1321bf";

  // make a request to the URL (To get Lat/Lon from user selected city)
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log("Data to pull Lon & Lat", data);

      var latitude = data.city.coord.lat;
      var longitude = data.city.coord.lon;

      console.log("Latitude", latitude);
      console.log("Longitute", longitude);
      // Use Lat / Lon and complete another fetch to get weather data
      var oneCallWeather =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=metric&exclude=minutely,hourly,alerts&appid=cb75ebe43da83650fe06f37d2f1321bf";

      return fetch(oneCallWeather).then(function (response) {
        return response.json().then(function (data) {
          // Variables to be displayed under current weather
          var currentTemp = Math.floor(data.current.temp);
          var currentHumidity = data.current.humidity;
          var currentWindSpeed = Math.floor(data.current.wind_speed * 3.6);
          var currentUVI = data.current.uvi;
          var currentIcon = data.current.weather[0].icon;
          var currentImgSrc =
            "http://openweathermap.org/img/wn/" + currentIcon + ".png";

          //Replacing text content with retreived data
          document.getElementById("cityNameDisplay").textContent =
            cityname + " (" + moment().format("MM/DD/YYYY") + ") ";
          document.getElementById("tempDisplay").textContent =
            " " + currentTemp + " °C";
          document
            .getElementById("currentIcon")
            .setAttribute("src", currentImgSrc);
          document.getElementById("humidityDisplay").textContent =
            " " + currentHumidity + "%";
          document.getElementById("windDisplay").textContent =
            " " + currentWindSpeed + "KPH";
          document.getElementById("uvDisplay").textContent = " " + currentUVI;

          console.log("One Call Data:", data);

          //LOOP through 5 day forecast
          for (i = 0; i < 5; i++) {
            var targetData = data.daily[i];

            var cardDiv = document.createElement("div");
            cardDiv.setAttribute("class", "card col");

            var dateH5 = document.createElement("h5");
            // convert Epoch time to current x1000
            dateH5.textContent = moment(targetData.dt * 1000).format(
              "MM/DD/YYYY"
            );

            var iconImg = document.createElement("img");
            iconImg.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" +
                targetData.weather[0].icon +
                ".png"
            );

            var temps = document.createElement("p");
            temps.textContent = "Temp: " + targetData.temp.day + " °C";

            var humid = document.createElement("p");
            humid.textContent = "Humidity: " + targetData.humidity + "%";

            // apending elements together into a Div
            cardDiv.append(dateH5);
            cardDiv.append(iconImg);
            cardDiv.append(temps);
            cardDiv.append(humid);
            // append the whole div into the HTML
            document.getElementById("cardContainer").append(cardDiv);
            // cardDiv.setAttribute("class", "bg-primary");
          }
        });
      });
    });
  });
};

var searchFormEl = document.querySelector("#search-form");
var cityNameEl = document.querySelector("#city-name");

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var cityname = cityNameEl.value.trim();

  if (cityname) {
    getCityWeather(cityname);
    cityNameEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

//run function on submit
searchFormEl.addEventListener("submit", formSubmitHandler);
