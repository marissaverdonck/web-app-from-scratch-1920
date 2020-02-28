import { getUserLocation, success, error, getTimeZone } from './userLocation.js';
import { addDistance, filterAndSortLocations, getWeather, getWeatherDetail, getValueFromFilter } from './data-helpers.js';
import { renderSkiData, renderDetailData } from './render.js'
import skiarea from './skiLocationApi.js'

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
    .then(x => { console.log(x); return x })
    .then(success)
    .catch(error)
    .then(
      x => { console.log(x); return x }
    )
    .then(
      (x) => {
        renderApp(x.currentLat, x.currentLon)
        renderSkiAreas(x.currentLat, x.currentLon, skiarea)
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
      console.log('Results', weatherDetailData)
      return weatherDetailData
    })
    .then((weatherDetailData) => {
      renderDetailData(weatherDetailData)
    })

}
// User input
const filterButton = document.getElementById("filterButton")
filterButton.addEventListener("click", renderFilterInput)

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

export { router }