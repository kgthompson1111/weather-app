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
let tempFormat = document.getElementById('tempFormat');
let formatToggle = document.getElementById('formatToggle');

// global variable to store weather data
let data;
let thisCity;
let isFarenheit;
loadTemperatureFormat();

//array for days of the week
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

// temp format toggle event listener
formatToggle.addEventListener('change', () => {
    switchTemperatureFormat();
});


// set weatherCard visibility to none
async function getCurrentWeather(city) {
    //fetch data from openWeatherMap
    try {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cca9bf6e3767fb41353c843d11ae019c`, {mode: 'cors'})
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
    thisCity = citySearch.value;
    clearSearchBox();
    e.preventDefault();
    if(data) {
        fadeOut();
        weatherCard.addEventListener('webkitTransitionEnd', () => {
            getCurrentWeather(thisCity);
        });
    } else {
        getCurrentWeather(thisCity);
    }
});

function buildWeatherCard(input) {
    city.textContent = input.name;
    country.textContent = input.sys.country;
    date.textContent = displayDay();
    temperature.textContent = convertKelvin(input.main.temp);
    humidity.textContent = input.main.humidity;
    pressure.textContent = input.main.pressure;
    icon.src = `http://openweathermap.org/img/wn/${input.weather[0].icon}@2x.png`;
    icon.onload = () => { fadeIn(); }
}

function convertKelvin(input) {
    // convert K to farenheit
    if(isFarenheit) {
        let farenheit = (((input - 273.15) * (9/5)) + 32);
        return Math.floor(farenheit);
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

function fadeIn() {
    weatherCard.style.opacity = 1;
}

function fadeOut() {
    weatherCard.style.opacity = 0;
}

function switchTemperatureFormat() {
    if(isFarenheit) {
        tempFormat.innerHTML = `&deg;C`;
        isFarenheit = false;
    } else {
        tempFormat.innerHTML = `&deg;F`;
        isFarenheit = true;
    }
    temperature.textContent = convertKelvin(data.main.temp);
}

function loadTemperatureFormat() {
    // change symbol
    if(formatToggle.checked) {
        isFarenheit = true;
        tempFormat.innerHTML = '&deg;F';
    } else {
        isFarenheit = false;
        tempFormat.innerHTML = '&deg;C';
    }
}

function clearSearchBox() {
    citySearch.value = "";
}