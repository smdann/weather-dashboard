var APIKey = "66480ffae0c528a21ade847c422f34ac";
const weatherDays = [];
let currentDay = null;




// Makes the API call
function getAPI(city) {

  const queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

  fetch(queryURL)
  
  .then(function(data){
    return data.json();
  })

  .then(function(data) {
    console.log(data);
    data.list.forEach(function(tsObj){

      // Makes a moment date object for each record
      const dateObj = moment.unix(tsObj.dt)

      // Generates the day # for the day in the date object
      const dateNum = dateObj.format("DDD")

      // If the current date in tsObj hasn't had a record put into weatherDays, do that now
      // Then skip over all other records for this day
      if (dateNum !== currentDay && weatherDays.length < 5){
        weatherDays.push(tsObj)
        currentDay = dateNum
      }

    })
      
    });
  }


$("#primary").on("click", function citySearch(){
  console.log("button clicked");
  var citySearch = $("#enterCity").val();
  console.log(citySearch)
  getAPI(citySearch)
  
})


  

/* Remember that the query URL won't work automatically as it's written. You'll need to adjust your application to accept user input, to store in the city variable that you've created. */

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


// Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. 
// Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?


/*
function addToDOM(tag, content, appendTo){
  const elem = document.createElement(tag)
  elem.textContent = content
  document.querySelector(appendTo).appendChild(elem)
}
*/

//  addToDOM("h3", data[i].user.login, "#issues")
