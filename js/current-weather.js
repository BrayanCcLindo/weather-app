//import weather from '../data/current-weather.js'
import {formatDate, formatTemp} from '../js/formatdata.js'
import { weatherConditionCodes } from '../js/constants.js'
import { getLatLon } from '../js/geolocation.js'
import { getCurrentWeather } from '../services/weather.js'

//weather conditions //
//weatherConditionCodes[String(weather.weather[0].id).charAt(0)]



function setCurrentCity(element, city){
    element.textContent = city
}




function setCurrentDate(element){
    const date = new Date()
    const formatedDate = formatDate(date)
    element.textContent = formatedDate
}


function setCurrentTemp(element, temp){
    element.textContent = formatTemp(temp)
}

//Cambio del background-imagen respecto al clima//

function solarStatus(sunsetTime, sunriseTime){
    const currentHours = new Date().getHours()
    const sunsetHours = sunsetTime.getHours()
    const sunriseHours = sunriseTime.getHours()




if(currentHours > sunsetHours || currentHours < sunriseHours){
    return 'night'
}
return 'morning'
}

function setCurrentBackground(element,conditionCode, solarStatus){
    const weatherType = weatherConditionCodes[conditionCode]
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 1)').matches ? '@2x' : ''

    element.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}


function showCurrentWeather($app, $loader){
    $app.hidden = false;
    $loader.hidden = true;
}

//LLamado a las funciones//
function configCurrentWeather(weather){

    //loader
    const $app = document.querySelector('#app')
    const $loading = document.querySelector('#loading')
    showCurrentWeather($app, $loading)

    //date//
    const $currentWeatherDate = document.querySelector('#current-weather-date')
    setCurrentDate($currentWeatherDate)


    //City//
    const $currentWeatherCity = document.querySelector('#current-weather-city')
    const city = weather.name
    setCurrentCity($currentWeatherCity, city)

    //Temp//
    const $currentWeatherTemp = document.querySelector('#current-weather-temp')
    const temp = weather.main.temp;
    setCurrentTemp($currentWeatherTemp, temp)

    //background//
    const sunriseTime = new Date(weather.sys.sunrise * 1000)
    const sunsetTime = new Date(weather.sys.sunset * 1000)
    const conditionCode = String(weather.weather[0].id).charAt(0)
    setCurrentBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))
}

export default async function currentWeather(){

   
    const {lat, lon, isError} = await getLatLon()
    if(isError) return console.log('No te encontramos')
    //console.log(lat, lon)
    //console.log(lat, lon)
    
/*     getCurrentPosition()
    .then((data)=>{
        console.log(data)
    })
    .catch((message) =>{

        console.log(message)
    })  */
    
    const { isError:currentWeatherError, data: weather} = await getCurrentWeather(lat, lon)
    if (currentWeatherError) return console.log('A ocurrido un error')
    configCurrentWeather(weather); 
}


