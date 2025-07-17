const apiKey = '694d32d937b77fbe4855f6258b3c2b59';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkweather(city) { // hava durumu kontrolü
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    } else {
        document.querySelector(".weather").style.display = "block";
    }

    var data = await response.json();

    document.querySelector('.city').innerHTML = data.name; // şehir adı
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c'; // sıcaklık
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';              // nem oranı
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h'; // rüzgar hızı

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {               // hava durumu simgeleri
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector('.error').style.display = "none";
}


searchBtn.addEventListener('click', () => {
    checkweather(searchBox.value);                      // butona tıklama
});


searchBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();     // enter ile arama yapma
        searchBtn.click();
    }
});