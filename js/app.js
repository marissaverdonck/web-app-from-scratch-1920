import skiarea from './skiareas.js';


const userLocation = document.querySelector('#userLocation')
const listSkiAreas = document.querySelector('#listSkiAreas')

// Get the location from the user









// Get the location from the user
function findUserLocation() {
  const userLocation = document.querySelector('#userLocation')

  function success(position) {
    let currentLat = position.coords.latitude;
    let currentLon = position.coords.longitude;
    userLocation.textContent = currentLat + ', ' + currentLon + '. Getting location name...';
    getTimeZone(currentLat, currentLon)
  }

  function error() {
    userLocation.textContent = 'Unable to retrieve your location'
    let currentLat = 52.347488;
    let currentLon = 4.917522;
    getDistanceSkiareas(currentLat, currentLon)
  }

  if (!navigator.geolocation) {
    userLocation.textContent = 'Geolocation is not supported by your browser'
    let currentLat = 52.347488;
    let currentLon = 4.917522;
    getDistanceSkiareas(currentLat, currentLon)

  } else {
    userLocation.textContent = 'locating...'
    navigator.geolocation.getCurrentPosition(success, error);
  }

  //Get the location name from DarkSky
  function getTimeZone(currentLat, currentLon) {
    fetch(`${cors}${url}${key2}/${currentLat},${currentLon}${units}`)
      .then((response) => {
        return response.json();
      })
      .then((userTime) => {
        // Set the name of the user location
        userLocation.textContent = `${userTime.timezone}`
        getDistanceSkiareas(currentLat, currentLon)
      });
  }
}

window.addEventListener("load", findUserLocation)







// Get the location from the user
// window.addEventListener("load", () => {
//   let currentLat;
//   let currentLong;
//   let currentLatLong;
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(position => {
//       currentLatLong = position.coords.latitude + ',' + position.coords.longitude
//       currentLat = position.coords.latitude;
//       currentLong = position.coords.longitude;
//       // calculateDistance(currentLatLong)
//       getTimeZone(currentLatLong)
//       getDistanceSkiareas(currentLat, currentLong)
//       return { currentLat, currentLong, currentLatLong }
//     });
//   } else {
//     alert("Hello! I am an alert box!!");
//   }
// })

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


function getDistanceSkiareas(currentLat, currentLon) {
  let skiareasWithDistance = skiarea.skiAreas.skiArea.map(skiarea => {
    const lat1 = currentLat;
    const lon1 = currentLon;
    // check if there is data in georeferencing
    const lat2 = skiarea.georeferencing ? skiarea.georeferencing._lat : null
    const lon2 = lat2 !== null ? skiarea.georeferencing._lng : null

    // If there is data found, go further
    if (lon2 !== null) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1); // deg2rad below
      var dLon = deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km

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
  filterAndSortSkiareas(skiareasWithDistance)
}


function filterAndSortSkiareas(skiareasWithDistance) {
  var filteredAreas = skiareasWithDistance.filter(
    function(skiareasWithDistance) {
      const distance = skiareasWithDistance ? skiareasWithDistance.distance : null
      const newdata = distance >= 940 && distance <= 950;
      return newdata
    });
  var filteredAndSortAreas = filteredAreas.sort((a, b) => (a.distance - b.distance))

  // console.log(filteredAreas)


  // renderData(filteredAndSortAreas)
  renderData(filteredAndSortAreas)
}




const cors = 'https://cors-anywhere.herokuapp.com/'
const url = 'https://api.darksky.net/forecast/'
var key = '43d7f14e28e4ad05109359319da1a156'
var key2 = '6b0215f3cade32440e76bd5a8c70e909'
  // units is voor celsius en km
const units = '?units=si'


function renderData(filteredAndSortAreas) {
  filteredAndSortAreas.reduce(function(acc, cur, ind) {
    //render 10 items because of limit weather app
    if (ind < 10) {
      fetch(`${cors}${url}${key}/${cur.lat},${cur.lon}${units}`)
        .then((response) => {
          return response.json();
        })
        .then((weatherData) => {
          console.log(weatherData)
          listSkiAreas.insertAdjacentHTML('afterbegin', `
          <li id="id${cur.id}">
          <a href="#id${cur.id}">
          <article>
          <h4>${cur.name}, ${cur.regio}</h4>
          <p>Distance:${cur.distance}km</p>
          <div class="weather">
          <p>temperature: ${weatherData.currently.temperature}˚C</p>
          <p>${weatherData.currently.icon}</p>
          </div>
          </article>
          </a>
          </li>`)
        })
    }
  }, 0)
}



// Set unix to Time
// bron: https://makitweb.com/convert-unix-timestamp-to-date-time-with-javascript/
function convertUnix() {
  var unixtimestamp = 1580770800;
  var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var date = new Date(unixtimestamp * 1000);
  var year = date.getFullYear();
  var month = months_arr[date.getMonth()];
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  // Display date time in MM-dd-yyyy h:m:s format
  var convdataTime = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  console.log(convdataTime)
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