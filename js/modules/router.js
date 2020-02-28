import { getUserLocation, success, error, getTimeZone } from './userLocation.js';
import { addDistance, filterAndSortLocations, getWeather, getValueFromFilter } from './data-helpers.js';
import { renderSkiData } from './render.js'
import skiarea from './skiLocationApi.js'

function router() {
  routie({

    '': () => {
      startApp()

    },

    'detail.html': () => {
      console.log('detail')
    },
  });
}

function startApp() {
  getUserLocation()
    .then(x => { console.log(x); return x })
    .then(success)
    .catch(error)
    .then(
      x => { console.log(x); return x }
      // getTimeZone
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
  const filteredSortedLocations = filterAndSortLocations(distanceArray, 0, 1000);

  getWeather(filteredSortedLocations)
    .then(weatherArray => {
      console.log('Results', weatherArray)
      return weatherArray
    })
    .then((weatherArray) => {
      renderSkiData(weatherArray)
      console.log(weatherArray)
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
  console.log(filterInput)

  const filteredSortedLocations = filterAndSortLocations(distanceArray, filterInputMin, filterInputMax);

  getWeather(filteredSortedLocations)
    .then(weatherArray => {
      console.log('Results', weatherArray)
      return weatherArray
    })
    .then((weatherArray) => {
      renderSkiData(weatherArray)
      console.log(weatherArray)
    })
}


// function showDetails(id) {
//   const activeArticle = document.querySelector(`#id${id}`);
//   if (document.querySelector('.active')) {
//     document.querySelector('.active').classList.remove('active')
//   }
//   if (activeArticle != null) {
//     activeArticle.classList.add('active')

//   }
// }
export { router }