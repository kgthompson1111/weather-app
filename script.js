// DOM Selectors
const weatherSearch = document.getElementById('weatherSearch');
const contentHolder = document.getElementById('contentHolder');
const weatherCard = document.getElementById('weatherCard');

// COM selectors for weather card variables
let city = document.getElementById('city');
let country = document.getElementById('country');
let temperature = document.getElementById('temperature');
let humidity = document.getElementById('humidity');
let icon = document.getElementById('icon');
let pressure = document.getElementById('pressure');
let weekday = document.getElementById('weekday');

// global variable to store weather data
let data
let isFarenheit = false;

//array for days of the week
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

// weatherCard.style.display = "none";

// set weatherCard visibility to none
async function getCurrentWeather(city) {
    //first, fetch data from openweathermap 
    try {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cca9bf6e3767fb41353c843d11ae019c`, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            // handle 404 returned by API
            if(response.cod == "404") {
                alert(response.message);
                return;
            }
            // if no error, set data to response object
            data = response;
            console.log(data);
            console.log(data.name);
            console.log(data.sys.country);
            console.log(data.weather[0].main);
            console.log(data.main.temp);
            console.log(data.main.humidity);
            console.log(data.main.pressure);
            console.log(data.main.pressure);
            console.log(data.weather[0].icon)
            console.log(data.lastupdate);
        })
        .then(function() {
            buildWeatherCard(data);
        })
    } catch (error) {
        alert("There was an error with your request, please try again");
    }
        //build a weather card to display
}

weatherSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    getCurrentWeather(`${citySearch.value}`);
});

function buildWeatherCard(input) {
    city.textContent = input.name;
    country.textContent = input.sys.country;
    weekday.textContent = displayDay();
    temperature.textContent = convertKelvin(input.main.temp);
    humidity.textContent = input.main.humidity;
    pressure.textContent = input.main.pressure;
    icon.src = `http://openweathermap.org/img/wn/${input.weather[0].icon}@2x.png`;
}

function convertKelvin(input) {
    // convert K to farenheit
    if(isFarenheit) {
        let farenheit = (((input - 273.15) * (9/5)) + 32);
        return farenheit;
    }
    // convert K to celsius
    return Math.floor(input - 273.15);
}

function displayDay() {
    const today = new Date();
    let cleanDate = today.toDateString();
    // return days[today.getDay()];
    return cleanDate;
}