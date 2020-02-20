import skiarea from './skiareas.js';
const listSkiAreas = document.querySelector('#listSkiAreas')
const loadmorebutton = document.querySelector('#loadmore');
console.log(skiarea)








// Get the location from the user
function findUserLocation() {
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const url = 'https://api.darksky.net/forecast/'
  const key = '43d7f14e28e4ad05109359319da1a156'
  const key2 = '6b0215f3cade32440e76bd5a8c70e909'
  const key3 = '41b9df401599f007aff98cfa0c66811d'
  const key4 = 'cc468fa2e1d6646e5d249e3cb27b48ed'
    // units is voor celsius en km
  const units = '?units=si'
  const userLocation = document.querySelector('#userLocation')

  function success(position) {
    const currentLat = position.coords.latitude;
    const currentLon = position.coords.longitude;
    userLocation.textContent = currentLat + ', ' + currentLon + '. Waiting for location name...';
    getTimeZone(currentLat, currentLon)
  }

  function error() {
    userLocation.textContent = 'Unable to retrieve your location'
    const currentLat = 52.347488;
    const currentLon = 4.917522;
    calculateDistance(currentLat, currentLon)
  }

  if (!navigator.geolocation) {
    userLocation.textContent = 'Geolocation is not supported by your browser'
    const currentLat = 52.347488;
    const currentLon = 4.917522;
    calculateDistance(currentLat, currentLon)

  } else {
    userLocation.textContent = 'locating...'
    navigator.geolocation.getCurrentPosition(success, error);
  }

  //Get the location name from DarkSky
  function getTimeZone(currentLat, currentLon) {
    fetch(`${cors}${url}${key4}/${currentLat},${currentLon}${units}`)
      .then((response) => {
        return response.json();
      })
      .then((userTime) => {
        // Set the name of the user location
        userLocation.textContent = `${userTime.timezone}`
        calculateDistance(currentLat, currentLon)
      });
  }
}
window.addEventListener("load", findUserLocation)

// Get distance from Google
// Key van Coen. Niet uploaden naar Github zonder .env!!
// function calculateDistance(currentLatLong) {
//   const urlGoogle = 'https://maps.googleapis.com/maps/api/distancematrix/'
//   const keyGoogle = ''
//   fetch(`${cors}${urlGoogle}json?origins=${currentLatLong}&destinations=${latGerlos},${longGerlos}&key=${keyGoogle}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((googleMaps) => {
//       console.log(googleMaps);
//     });
// }

//  bron: http://www.movable-type.co.uk/scripts/latlong.html
function calculateDistance(currentLat, currentLon) {
  const locationArray = skiarea.skiAreas.skiArea.map((skiarea, index, array) => {
    const lat1 = currentLat;
    const lon1 = currentLon;
    // check if there is data in georeferencing
    const lat2 = skiarea.georeferencing ? skiarea.georeferencing._lat : null
    const lon2 = lat2 !== null ? skiarea.georeferencing._lng : null

    // If there is data found, go further
    if (lon2 !== null) {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1); // deg2rad below
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km

      function deg2rad(deg) {
        return deg * (Math.PI / 180)
      }

      return {
        id: skiarea._id,
        name: skiarea.name.__cdata,
        regio: skiarea.regions.region.__cdata,
        lat: skiarea.georeferencing._lat,
        lon: skiarea.georeferencing._lng,
        distance: Number(d.toFixed(1))
      }
    }
  })

  localStorage.setItem('locationArray', JSON.stringify(locationArray))
  console.log(locationArray)
  getValueFromFilter(locationArray)
}


const filterButton = document.getElementById("filterButton")
filterButton.addEventListener("click", getValueFromFilter);

function getValueFromFilter(locationArray) {
  const filterInputMin = document.getElementById("min-distance").value;
  const filterInputMax = document.getElementById("max-distance").value;
  filterAndSortLocations(filterInputMin, filterInputMax, locationArray)
}





function filterAndSortLocations(filterInputMin, filterInputMax, locationArrayNew) {
  const locationArrayString = localStorage.getItem('locationArray')
  const locationParsedArray = JSON.parse(locationArrayString)
    // Load from local storage. Not available? Load from calculateDistance()
    // const locationArray = locationArrayNew;
  const locationArray = locationParsedArray;
  // const locationArray = locationParsedArray ? locationParsedArray : locationArrayNew;


  const minDistance = filterInputMin ? filterInputMin : 0;
  const maxDistance = filterInputMax ? filterInputMax : 1000;

  const filteredAreas = locationArray.filter(

    function(locationArray) {
      // Because of null values in the array, caused by stringify
      const distance = (locationArray == null) ? locationArray = 'undefined' :
        (locationArray.distance == null) ? locationArray.distance = 'undefined' :
        locationArray.distance = locationArray.distance

      const newdata = distance >= minDistance && distance <= maxDistance;
      console.log(minDistance + ',' + maxDistance)
      return newdata
    });

  const filteredSortedLocations = filteredAreas.sort((a, b) => (a.distance - b.distance))
  getWeather(filteredSortedLocations)
  console.log(filteredSortedLocations)
}

function getWeather(filteredSortedLocations) {
  const endOfResultList = document.querySelector('ul')
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const url = 'https://api.darksky.net/forecast/'
  const key = '43d7f14e28e4ad05109359319da1a156'
  const key2 = '6b0215f3cade32440e76bd5a8c70e909'
  const key3 = '41b9df401599f007aff98cfa0c66811d'
  const key4 = 'cc468fa2e1d6646e5d249e3cb27b48ed'
    // units is voor celsius en km
  const units = '?units=si'
  filteredSortedLocations.reduce(function(acc, cur, ind) {
    //render 10 items because of limit weather app

    if (ind < 5) {
      fetch(`${cors}${url}${key4}/${cur.lat},${cur.lon}${units}`)
        .then((response) => {
          return response.json();
        })
        .then((weatherData) => {
          console.log(weatherData)

          listSkiAreas.insertAdjacentHTML('beforeend', `
          <li id="id${cur.id}">
          <a href="#id${cur.id}">

          <article>
          <h4>${cur.name}, ${cur.regio}</h4>

          <div>
          <p>Distance: ${cur.distance}km</p>
          <p>Temperature: ${Math.floor(weatherData.currently.temperature)}˚C</p>
          </div>

          <div class="weather">
          <canvas class="currentIcon" id=currentIcon${cur.id} width="128" height"128">${weatherData.currently.icon}</canvas> 
          </div>

          <div>
          <h5>Next hours</h5>
          <article>
          <p>${convertUnix(weatherData.hourly.data[0].time)}</p> 
          <canvas class="iconH1" id=iconH1${cur.id}>${weatherData.hourly.data[0].icon}</canvas> 
          <p>${Math.floor(weatherData.hourly.data[0].temperature)}˚C</p>

          </article>

          <article>
          <p>${convertUnix(weatherData.hourly.data[3].time)}</p> 
          <canvas class="iconH2" id=iconH2${cur.id}>${weatherData.hourly.data[3].icon}</canvas> 
          <p>${Math.floor(weatherData.hourly.data[3].temperature)}˚C</p>
          </article>

          <article>
          <p>${convertUnix(weatherData.hourly.data[6].time)}</p> 
          <canvas class="iconH3" id=iconH3${cur.id}>${weatherData.hourly.data[6].icon}</canvas> 
          <p>${Math.floor(weatherData.hourly.data[6].temperature)}˚C</p>     
          </div>
          </article>

          </article>
          </a>
          </li>
          `)
          console.log(ind)
          console.log(document.querySelectorAll('.currentIcon').item(ind))
          setIcons(weatherData.currently.icon, document.querySelectorAll('.currentIcon').item(ind))
          setIcons(weatherData.hourly.data[0].icon, document.querySelectorAll('.iconH1').item(ind))
          setIcons(weatherData.hourly.data[3].icon, document.querySelectorAll('.iconH2').item(ind))
          setIcons(weatherData.hourly.data[6].icon, document.querySelectorAll('.iconH3').item(ind))

        })
    }
  }, 0)
  loadmorebutton.classList.add('show')
}

// Set unix to Time
// bron: https://makitweb.com/convert-unix-timestamp-to-date-time-with-javascript/
function convertUnix(unixtimestamp) {
  const months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(unixtimestamp * 1000);
  const year = date.getFullYear();
  const month = months_arr[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  // Display date time in MM-dd-yyyy h:m:s format
  const convdataTime = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  const time = hours + ':' + minutes.substr(-2);
  return time
}

routie({
  'id:id': id => {
    console.log(id)
    showDetails(id)
  },
  'detail/#:id': id => {
    console.log(id)
  }
});

function showDetails(id) {
  const activeArticle = document.querySelector(`#id${id}`);
  if (document.querySelector('.active')) {
    document.querySelector('.active').classList.remove('active')
  }
  if (activeArticle != null) {
    activeArticle.classList.add('active')

  }
}

// Bron: https://www.youtube.com/watch?v=wPElVpR1rwA
function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: "white" });
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}