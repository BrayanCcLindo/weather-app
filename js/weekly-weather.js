import { getWeeklyWeather } from "../services/weather.js";
import { getLatLon } from "./geolocation.js";
import { formatListData } from "./formatdata.js";
import { createDOM } from "./dom.js";
import { createPeriodTime } from "./period-time.js";
import draggable from "./daggable.js";
import { formatTemp } from "./formatdata.js";

function tabPanelTemplate(id) {
  return `<div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
    <div class="dayWeather" id="dayWeather-${id}">
      <ul class="dayWeather-list" id="dayWeather-list-${id}">
      </ul>
    </div>
  </div>`;
}

function createTabPanel(id) {
  const panel = createDOM(tabPanelTemplate(id));
  if (id > 0) {
    panel.hidden = true;
  }
  return panel;
}

function configWeeklyWeather(weekList) {
  const container = document.querySelector("#tabs");
  const containerDetails = document.querySelector("#dayWeatherDetails");

  weekList.forEach((day, index) => {
    const panel = createTabPanel(index);
    console.log(panel, "panel");
    container.append(panel);

    day.forEach((weather) => {
      const tabItem = createPeriodTime(weather);
      panel.querySelector(".dayWeather-list").append(tabItem);
      tabItem.addEventListener("click", (event) => {
        const tabItemSelected = event.target.parentNode;
        const tabItemActive = document.querySelector(
          '.dayWeather-item[aria-selected="true"]'
        );
        const newWeather = [...day];
        const findWeather = newWeather.findIndex((w) => {
          return w.dt === weather.dt;
        });
        const selectedWeather = newWeather[findWeather];
        const TempDetails = createWeeklyConfig(selectedWeather);
        containerDetails.append(TempDetails);
        tabItemSelected.setAttribute("aria-selected", true);
        tabItemActive?.removeAttribute("aria-selected");
        const test = containerDetails.querySelectorAll(".dayWeather-details");
        console.log(test.length, "test");
        if (test.length > 1) {
          for (let i = 0; i < test.length - 1; i++) {
            test[i].style.display = "none";
          }
        }
      });
    });
  });
}

function createWeeklyConfig(weather) {
  const maxTempConfig = formatTemp(weather.main.temp_max);
  const minTempConfig = formatTemp(weather.main.temp_min);
  const wind = formatTemp(weather.wind.deg);
  const humidity = formatTemp(weather.main.humidity);
  const config = {
    maxTempConfig,
    minTempConfig,
    wind,
    humidity,
  };
  return createDOM(weeklyWeatherDetails(config));
}

const weeklyWeatherDetails = ({
  maxTempConfig,
  minTempConfig,
  wind,
  humidity,
}) => {
  return `<div  class="dayWeather-details">
    <div>
      <p>Máx: <span>${maxTempConfig}</span></p>
      <p>Mín: <span>${minTempConfig}</span></p>
    </div>
    <div>
      <p>Viento: <span>${wind}</span></p>
      <p>Humedad: <span>${humidity}</span></p>
    </div>
  </div>`;
};

export default async function weeklyWeather() {
  const container = document.querySelector(".weeklyWeather");
  const { lat, lon, isError } = await getLatLon();
  if (isError) return console.log("No te encontramos");
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(
    lat,
    lon
  );
  if (weeklyWeatherError) return console.log("A ocurrido un error");
  const weekList = formatListData(weather.list);

  configWeeklyWeather(weekList);
  draggable(container);
}
