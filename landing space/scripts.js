const weatherApiKey = 'a66939cc0876111cf247a510a629010a';
const mapApiKey = "pk.eyJ1IjoiYXNhbGFqIiwiYSI6ImNsNDQzYW5xZTFuZTkzY3F5MjkzcjlyYXkifQ.yvKHwi8--gs7FMWJN2vRmA";

let weather = {
    apiKey: weatherApiKey,

    getCityName: function () {
        let city = document.querySelector(".search-input").value;
        this.getWeatherData(city)
    },

    getWeatherData: function(city) {
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        +"&units=metric&appid="
        +this.apiKey
    )
    .then((response) => response.json())
    .then((data)=> this.displayWeatherData(data));
    },

    displayWeatherData: function(data) {
        const { name } = data;
        const { lon, lat } = data.coord;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure, sea_level, grnd_level} = data.main;
        const { speed } = data.wind;
        
        let coordinates = [];
        coordinates.push(lon,lat);
        setupMap(coordinates);

        document.querySelector(".city").innerText = "Weather in " + name
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity:  "+ humidity+"%";
        document.querySelector(".wind").innerText="Wind speed:  "+ speed +"km/hr";
        document.querySelector(".temp").innerText="Temprature:  "+ temp+"°C";
        document.querySelector(".pressure").innerText="Pressure:  "+ pressure +"mmHg";
        document.querySelector(".sea").innerText="Sea Level:  "+ sea_level;
        document.querySelector(".ground").innerText="Ground Level:  "+ grnd_level;
        document.querySelector(".latitude").innerText="Latitude:  "+ lat;
        document.querySelector(".longitude").innerText="Longitude:  "+ lon;
        document.querySelector('.weather-display').classList.remove('loading');
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+name+"')"
    },

}



mapboxgl.accessToken = mapApiKey;

function setupMap(center) {
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom:10,
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');
}

document.querySelector("#search-btn").addEventListener("click", ()=>{
    weather.getCityName();
})

document.querySelector(".search-input").addEventListener("keyup" ,(event)=>{
    if (event.key === "Enter") {
        weather.getCityName();
    }
})


weather.getWeatherData("Merritt Island");