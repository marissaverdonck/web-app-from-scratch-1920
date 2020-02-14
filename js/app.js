// https://skimap.org/pages/Developers#skiArea
// https://skimap.org/SkiAreas/index.xml
import skiarea from './skiareas.js'

// Gerlos, Austria
const latGerlos = '47.2427646064301'
const longGerlos = '12.0240211486816'
  // test location 
const lat = '52.379189'
const long = '4.899431'
const userLocation = document.querySelector('#currentLocation')
const listSkiAreas = document.querySelector('#listSkiAreas')


// Get the location from the user
window.addEventListener("load", () => {
  let currentLat;
  let currentLong;
  let currentLatLong;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      currentLatLong = position.coords.latitude + ',' + position.coords.longitude
      currentLat = position.coords.latitude;
      currentLong = position.coords.longitude;
      // calculateDistance(currentLatLong)
      getWeatherCurrentLocation(currentLatLong)
      getDistanceFromLatLonInKm(currentLat, currentLong)
      return { currentLatLong, currentLat, currentLong }
    });
  } else {
    console.log("Sorry, your browser don't support your location")
  }
})

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
function getDistanceFromLatLonInKm(currentLat, currentLong) {

  var i = 0;
  for (i = 0; i < skiarea.skiAreas.skiArea.length; i++) {
    // console.log(skiarea.skiAreas.skiArea[i])
    let lat1 = currentLat;
    let lon1 = currentLong;

    const lat2 = skiarea.skiAreas.skiArea[i].georeferencing ? skiarea.skiAreas.skiArea[i].georeferencing._lat : null
    const lon2 = lat2 !== null ? skiarea.skiAreas.skiArea[i].georeferencing._lng : null

    // if (!skiarea.skiAreas.skiArea[i].georeferencing) {
    //   lat2 = ''
    // } else {
    //   lat2 = skiarea.skiAreas.skiArea[i].georeferencing._lat;
    // }

    // let lon2 = skiarea.skiAreas.skiArea[i].georeferencing._lng;
    let latLongSkiAreas = lat2 + ',' + lon2;

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

      if (d.toFixed(1) < 700) {
        // console.log(skiarea.skiAreas.skiArea[i].name.__cdata)
        listSkiAreas.insertAdjacentHTML('afterend', `<li id="${skiarea.skiAreas.skiArea[i]._id}"><article><h3>${skiarea.skiAreas.skiArea[i].name.__cdata}, ${skiarea.skiAreas.skiArea[i].regions.region.__cdata}</h3><h4>Distance:${d.toFixed(1)}km</h4></article></li>`)

        //Get the weather from the shown Skiareas from DarkSky
        // fetch(`${cors}${url}${key}/${latLongSkiAreas}${units}`)
        //   .then((response) => {
        //     return response.json();
        //   })
        //   .then((myJson) => {
        //     console.log(myJson)
        // userLocation.insertAdjacentHTML('afterend', `<h4>${myJson.timezone}</h4>`)
        // });

      } else {
        console.log('verder weg')
      }
    }
  }
}

// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
const cors = 'https://cors-anywhere.herokuapp.com/'
const url = 'https://api.darksky.net/forecast/'
const key = '43d7f14e28e4ad05109359319da1a156'
  // units is voor celsius en km
const units = '?units=si'


function getWeatherCurrentLocation(currentLatLong) {
  //Get the weather from DarkSky
  fetch(`${cors}${url}${key}/${currentLatLong}${units}`)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      // Set the name of the user location
      userLocation.insertAdjacentHTML('afterend', `<h3>${myJson.timezone}</h3>`)
      console.log('test')
        // getWeatherSkiAreas()

    });
}








//Get the weather from all Skiareas from DarkSky

// function getWeatherSkiAreas() {
//   var i = 0;
//   for (i = 0; i < skiarea.skiAreas.skiArea.length; i++) {
//     const latSkiArea = skiarea.skiAreas.skiArea[i].georeferencing._lat;
//     const LongSkiArea = skiarea.skiAreas.skiArea[i].georeferencing._lng;
//     let latLongSkiAreas = latSkiArea + ',' + LongSkiArea;


//     fetch(`${cors}${url}${key}/${latLongSkiAreas}${units}`)
//       .then((response) => {
//         return response.json();
//       })
//       .then((myJson) => {
//         // Set the name of the user location
//         console.log(myJson)
//           // userLocation.insertAdjacentHTML('afterend', `<h4>${myJson.timezone}</h4>`)
//       });
//   }
// }

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