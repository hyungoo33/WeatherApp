const apiKey= '75a453281e89e339c59274d7d0f2af30';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const weather = document.getElementById('weather');
const temperature = document.getElementById('temp');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('weather-icon');
const city = document.getElementById('city');
const arrow = document.getElementById('wind-arrow');
let place = "";

//To fetch location from conf.json
fetch("./conf.json")
  .then( res => res.json())
  .then(data => {
    place = data.location;
    fetchWeather();
})

//To get data from openWeatherApi
function fetchWeather(){
    const url = `${apiUrl}?q=${place}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(url)
        .then((Response) => Response.json())
        .then(data => {
           weatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

//To connect fetched data to the front
function weatherData(details){
    city.textContent = details.name;
    weather.textContent = details.weather[0].description;
    let temp = Math.round(details.main.temp);
    temperature.textContent = `${temp}°C`;
    if(temp > 25){
        temperature.style.color = "#FF5733";
    }
    else if(temp > 15){
        temperature.style.color = "#FFB833";
    }
    else{
        temperature.style.color = "#18A5FF";
    }
    arrow.style.transform = "rotate("+(details.wind.deg-90)+"deg)";
    wind.textContent = `Vent : ${details.wind.speed}KM/H`;
    humidity.textContent = `Humidité : ${details.main.humidity}%`;
    const iconCode = details.weather[0].icon;
    weatherIcon.src =`https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    
}

//To refresh datas every hour
var nextDate = new Date();
if (nextDate.getMinutes() === 0) { 
    callEveryHour()
} else {
    nextDate.setHours(nextDate.getHours() + 1);
    nextDate.setMinutes(0);
    nextDate.setSeconds(0);

    var difference = nextDate - new Date();
    setTimeout(callEveryHour, difference);
}


function callEveryHour() {
    setInterval(fetchWeather, 1000 * 60 * 60);
}