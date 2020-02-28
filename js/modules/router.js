import { getUserLocation, success, error, getTimeZone } from './userLocation.js';
import { addDistance, filterAndSortLocations, getWeather, getWeatherDetail, getValueFromFilter } from './data-helpers.js';
import { renderSkiData, renderDetailData } from './render.js'
import skiarea from './skiLocationApi.js'
const filterButton = document.getElementById("filterButton")

function router() {
  routie({
    '': () => {
      startApp()
    },

    'detail:id?/:lat?/:lon': (id, lat, lon) => {
      renderDetails(id, lat, lon)
    }
  });
}

function startApp() {
  getUserLocation()
    .then(position => { return position })
    .then(success)
    .catch(error)
    .then(
      location => { return location }
    )
    .then(
      (location) => {
        renderApp(location.currentLat, location.currentLon)
        renderSkiAreas(location.currentLat, location.currentLon, skiarea)
      }
    )
}

function renderApp(lat, lon) {
  getTimeZone(lat, lon)
}

function renderSkiAreas(lat, lon, skiarea) {
  const distanceArray = addDistance(lat, lon, skiarea)
  const filteredSortedLocations = filterAndSortLocations(distanceArray);

  getWeather(filteredSortedLocations)
    .then(weatherArray => {
      return weatherArray
    })
    .then((weatherArray) => {
      renderSkiData(weatherArray)
    })
}

function renderDetails(id, lat, lon) {
  getWeatherDetail(id, lat, lon)
    .then(weatherDetailData => {
      return weatherDetailData
    })
    .then((weatherDetailData) => {
      renderDetailData(weatherDetailData)
    })

}

function renderFilterInput() {
  const filterInput = getValueFromFilter()
  const filterInputMin = filterInput.filterInputMin;
  const filterInputMax = filterInput.filterInputMax;
  const distanceArray = filterInput.distanceArray;
  const filteredSortedLocations = filterAndSortLocations(distanceArray, filterInputMin, filterInputMax);

  getWeather(filteredSortedLocations)
    .then(weatherArray => {
      return weatherArray
    })
    .then((weatherArray) => {
      renderSkiData(weatherArray)
    })
}

// User input
filterButton.addEventListener("click", renderFilterInput)

export { router }