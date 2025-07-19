const btn = document.querySelector('.btn')
const input = document.querySelector('input')
const temperature = document.querySelector('.temperature')
const cityName = document.querySelector('.cityName')
const humidity1 = document.querySelector('.humidity1')
const windSpeed = document.querySelector('.windSpeed')
const image = document.querySelector('.image')
const error = document.querySelector('.error')
const weatherContainer = document.querySelector('.data')
error.style.display = "none"

const weatherApiCall = (city) => {
    const apiKey = 'my_api_key'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    error.innerText = ""

    fetch(url)
    .then(response => {
        if(!response.ok) {
            error.style.display = "block"
            error.innerText = "Invalid city name"
            weatherContainer.style.display = "none"
            input.value = ""
            return;
        } else {
            weatherContainer.style.display = "block"
            return response.json()
        }
    })
    .then(data => {
        let cloud = data.weather[0].main
        if( cloud == "Clouds") image.src = "./images/clouds.png"
        else if(cloud == "Clear") image.src = "./images/clear.png"
        else if(cloud == "Rain") image.src = "./images/rain.png"
        else if(cloud == "Drizzle") image.src = "./images/drizzle.png"
        else if(cloud == "Mist") image.src = "./images/mist.png"
        temperature.innerText = data.main.temp
        cityName.innerText = data.name
        humidity1.innerText = data.main.humidity
        windSpeed.innerText = data.wind.speed
        input.value = ""
    })
    .catch(error => console.log(error))
}

btn.addEventListener('click', () => {
    const city = input.value.trim()
    if(city) {
        weatherApiCall(city)
    }
})
input.addEventListener("keydown",(e) => {
    if(e.key === "Enter"){
        const city = input.value.trim()
        weatherApiCall(city)
    }
})