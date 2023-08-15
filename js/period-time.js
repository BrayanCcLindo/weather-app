import { createDOM } from "./dom.js";
import { formatDate, formatTemp } from "./formatdata.js";

export function periodTimeTemplate({ temp, icon, date, description }) {
  return ` <li class="dayWeather-item" aria-selected="false" id="dayWeatherItem">
    <span class="dayWeather-time">${date}</span>
    <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt='${description}' rain="">
    <span class="dayWeather-temp">${temp}</span>
  </li>`;
}

export function createPeriodTime(weather) {
  //tem
  //icon
  //date
  //description

  const dateOptions = {
    hour: "numeric",
    hour12: true,
  };
  const temp = formatTemp(weather.main.temp);
  const maxTemp = formatTemp(weather.main.temp_max);
  const minTemp = formatTemp(weather.main.temp_min);

  const date = formatDate(new Date(weather.dt * 1000), dateOptions);

  const config = {
    temp,
    date,
    icon: weather.weather[0].icon,
    description: weather.weather[0].description,
    maxTemp,
    minTemp,
  };

  return createDOM(periodTimeTemplate(config));
}
