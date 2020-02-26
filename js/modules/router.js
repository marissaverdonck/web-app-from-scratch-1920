import { getUserLocation, success, error, getTimeZone } from './userLocation.js';
import { addDistance, filterAndSortLocations, getWeather } from './data-helpers.js';
import { renderSkiData } from './render.js'
import skiarea from './skiLocationApi.js'

const listSkiAreas = document.querySelector('#listSkiAreas')





// startApp();



function router() {
  routie({

    '': () => {
      startApp()

    },




    'id:id': id => {
      console.log(id)
        //   showDetails(id)








    },
    'detail/#:id': id => {
      console.log(id)
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
  const filteredSortedLocations = filterAndSortLocations(distanceArray);

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

function showDetails(id) {
  const activeArticle = document.querySelector(`#id${id}`);
  if (document.querySelector('.active')) {
    document.querySelector('.active').classList.remove('active')
  }
  if (activeArticle != null) {
    activeArticle.classList.add('active')

  }
}
export { router }