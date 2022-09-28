var APIKey = "66480ffae0c528a21ade847c422f34ac";
// const weatherDays = [];
// let currentDay = null;
let todayDate = moment().format("M/DD/YYYY");

let forecastDisplay = "";
let currentDisplay = "";
let cityButtons = "";



// Makes the API call and returns the json data for specified city
function getAPI(city) {

  const queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

  fetch(queryURL)
  
  .then(function(data){
    return data.json();
  })

  .then(function(data) {
    console.log(data);
    
    displayCurrentWeather(data.list, data.city.name)
    displayForecast(data.list)
    storeCity(data.city.name)
    
       
  })
}

// Displays the current weather data for the specified city
function displayCurrentWeather(data, citySearch) {
  $("#weather-items").empty()
  var cityHeading = $("#cityDate");
  cityHeading.html("")
  cityHeading.text(citySearch + " " + "(" + todayDate + ")")

  currentDisplay = `
    <div id="forecast-icon">
      <img src="https://openweathermap.org/img/w/${data[0].weather[0].icon}.png">
    </div>
    <div>
      <p> Temperature: ${data[0].main.temp} F </p>
      <p> Humidity: ${data[0].main.humidity}% </p>
      <p> Wind Speed: ${data[0].wind.speed} MPH </p>
    </div>
    `

    $("#weather-items").append(currentDisplay);
}

// Displays 5-day forecast (loop increments by 8 to exclude current day)
function displayForecast(data) {
  const forecastContainer = document.getElementById("forecast-row");
  forecastContainer.innerHTML = " ";

  for (let i = 1; i < data.length; i += 8) {
    const col = document.createElement("div");
    col.setAttribute("class", "col-2");
    const txt = document.createElement("h5");
    const icon = document.createElement("img");
    icon.setAttribute("src", "https://openweathermap.org/img/w/" + 
      data[i].weather[0].icon + ".png");
    const temp = document.createElement("p");
    const humidity = document.createElement("p");
    const wind = document.createElement("p");

    txt.textContent = data[i].dt_txt;
    temp.textContent = `Temperature: ${data[i].main.temp} F`;
    humidity.textContent = `Humidity: ${data[i].main.humidity}%`;
    wind.textContent = `Wind Speed: ${data[i].wind.speed} MPH`;

    col.append(txt,icon,temp,humidity,wind);
    forecastContainer.append(col);
}

 
  // for (let i = 1; i < data.length; i +=8) {
  //   forecastDisplay += `
  //   <div class="col-2">
  //   <h5> ${data[i].dt_txt} </h5>
  //     <div id="forecast-icon">
  //     <img src="https://openweathermap.org/img/w/${data[i].weather[0].icon}.png">
  //     </div>
  //       <p> Temperature: ${data[i].main.temp} F </p>
  //       <p> Humidity: ${data[i].main.humidity}% </p>
  //       <p> Wind Speed: ${data[i].wind.speed} MPH </p>
  //   </div>
  //   `
  // }
  // $("#forecast-row").append(forecastDisplay);

 
}

// Store searched city in local storage and add to secondary button
function storeCity(citySearch) {
  localStorage.setItem("City Name", citySearch)

  cityButtons = 
    `<button type="button" class="btn btn-secondary" id="store1">${citySearch}</button>`;
    $("#storeCity").append(cityButtons);

  // Event listener on secondary buttons
  $("#store1").on("click", function getCity() {
    console.log("secondary button clicked");
    localStorage.getItem(citySearch)
    console.log(citySearch)

    getAPI(citySearch)
    
    // Adds city name & date to heading of current weather
    // var cityHeading = $("");
  
    // cityHeading.text(citySearch + " " + "(" + todayDate + ")")
    // $("#cityDate").prepend(cityHeading)


  })

}

// Event listener on primary search button to initiate API GET with city name
$("#primary").on("click", function citySearch() {
  console.log("button clicked");
  var citySearch = $("#enterCity").val();
  console.log(citySearch)

  // Adds name of city searched and current date to heading of current weather section
  // var cityHeading = $("#cityDate");
  // cityHeading.html("")
  // cityHeading.text(citySearch + " " + "(" + todayDate + ")")
  getAPI(citySearch)
 
  
})


  

  
// Put event listener for secondary buttons outside function


// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


// Uses local storage to store persistant data



