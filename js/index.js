import currentWeather from  '../js/current-weather.js'
import { viewportSize } from  '../js/viewport.js'


const $app = document.querySelector('#app')
const $loading = document.querySelector('#loading')

viewportSize($app)
viewportSize($loading)

currentWeather();


