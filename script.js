var APIKey = "66480ffae0c528a21ade847c422f34ac";
const weatherDays = [];
let currentDay = null;
let todayDate = moment().format("M/DD/YYYY");

let forecastDisplay = "";
let currentDisplay = "";



// Makes the API call
function getAPI(city) {

  const queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

  fetch(queryURL)
  
  .then(function(data){
    return data.json();
  })

  .then(function(data) {
    console.log(data);
    displayForecast(data.list)
    displayCurrentWeather(data.list)
    // data.list.forEach(function(tsObj){

    //   // Makes a moment date object for each record
    //   const dateObj = moment.unix(tsObj.dt)
      
    //   // Generates the day # for the day in the date object
    //   const dateNum = dateObj.format("DDD")
      
    //   // If the current date in tsObj hasn't had a record put into weatherDays, do that now
    //   // Then skip over all other records for this day
    //   if (dateNum !== currentDay && weatherDays.length < 6){
    //     weatherDays.push(tsObj)
    //     currentDay = dateNum
        
        
      })
    }

function displayCurrentWeather(data) {
  currentDisplay = `
    <div id="forecast-icon">
      <img src="https://openweathermap.org/img/w/${data[0].weather[0].icon}.png">
    </div>
    <div>
      <p> Temperature: ${data[0].main.temp} F </p>
      <p> Humidity: ${data[0].main.humidity}% </p>
      <p> Wind Speed: ${data[0].wind.speed} MPH </p>
    </div>`

    $("#weather-items").append(currentDisplay);
}

// Displays 5-day forecast (loop increments by 8 to exclude current day)
function displayForecast(data) {
  
  for (let i = 1; i < data.length; i += 8) {

    forecastDisplay += `
    <div class="col-2">
    <h5> ${data[i].dt_txt} </h5>
      <div id="forecast-icon">
      <img src="https://openweathermap.org/img/w/${data[i].weather[0].icon}.png">
      </div>
        <p> Temperature: ${data[i].main.temp} F </p>
        <p> Humidity: ${data[i].main.humidity}% </p>
        <p> Wind Speed: ${data[i].wind.speed} MPH </p>
    </div>`
  }
  $(".forecast-row").append(forecastDisplay);
}

// Event listener on primary search button to initiate API GET with city name
$("#primary").on("click", function citySearch(){
  console.log("button clicked");
  var citySearch = $("#enterCity").val();
  console.log(citySearch)

  // Adds name of city searched and current date to heading of current weather section
  var cityHeading = $("<h2>");
  cityHeading.text(citySearch + " " + "(" + todayDate + ")")
  $("#cityDate").prepend(cityHeading)

  getAPI(citySearch)
  
})


  

  
  



// I WANT to see the weather outlook for multiple cities

// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history


// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


// Uses local storage to store persistant data





/*
function addToDOM(tag, content, appendTo){
  const elem = document.createElement(tag)
  elem.textContent = content
  document.querySelector(appendTo).appendChild(elem)
}
*/

//  addToDOM("h3", data[i].user.login, "#issues")
