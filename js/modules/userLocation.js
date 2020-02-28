// Get the location from the user
const cors = 'https://cors-anywhere.herokuapp.com/'
const url = 'https://api.darksky.net/forecast/'
const key = '43d7f14e28e4ad05109359319da1a156'
const key2 = '6b0215f3cade32440e76bd5a8c70e909'
const key3 = '41b9df401599f007aff98cfa0c66811d'
const key4 = 'cc468fa2e1d6646e5d249e3cb27b48ed'
  // units is voor celsius en km
const units = '?units=si'
const userLocation = document.querySelector('#userLocation')

function getUserLocation() {
  // no browser support 
  if (!navigator.geolocation) {
    userLocation.textContent = 'Geolocation is not supported by your browser'
    const currentLat = 52.347488;
    const currentLon = 4.917522;
    return { currentLat: currentLat, currentLon: currentLon }

  } else {
    userLocation.textContent = 'locating...'
    return new Promise((resolve, reject) => {
      (navigator.geolocation.getCurrentPosition(resolve, reject))
    })
  }
}

function success(position) {
  const currentLat = position.coords.latitude;
  const currentLon = position.coords.longitude;
  userLocation.textContent = currentLat + ', ' + currentLon + '. Waiting for location name...';
  return { currentLat: currentLat, currentLon: currentLon }
}

function error() {
  userLocation.textContent = 'Unable to retrieve your location'
  const currentLat = 52.347488;
  const currentLon = 4.917522;
  return { currentLat: currentLat, currentLon: currentLon }
}

//Get the location name from DarkSky
function getTimeZone(currentLat, currentLon) {

  let data = new Promise((resolve, reject) => {
    fetch(`${cors}${url}${key}/${currentLat},${currentLon}${units}`)
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((userTime) => {
        console.log(userTime)
          // Set the name of the user location
        userLocation.textContent = userTime.timezone
          //   calculateDistance(currentLat, currentLon)
        return userTime.timezone
      })
      .then((userTimezone) => {
        userLocation.textContent = userTimezone;
        const currentLatLong = { currentLat: currentLat, currentLon: currentLon }
        resolve(currentLatLong)
      })
      .catch((error) => {
        console.log(error)
        userLocation.textContent = error;
      })
  })
  return data
}


window.addEventListener("load", getUserLocation)

export { getUserLocation, getTimeZone, success, error };