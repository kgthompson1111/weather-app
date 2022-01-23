// DOM Selectors
const weatherSearch = document.getElementById('weatherSearch');
const contentHolder = document.getElementById('contentHolder');
const weatherCard = document.getElementById('weatherCard');

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
            console.log(response);
            if(response.cod == "404") {
                alert(response.message);
                return;
            }
            // if no error, set data to response object
            data = response;
        })
        .then(function(response) {
            buildWeatherCard(response);
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

function buildWeatherCard(data) {

}