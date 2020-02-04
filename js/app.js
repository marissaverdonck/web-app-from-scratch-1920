// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
const cors = 'https://cors-anywhere.herokuapp.com/'
const url = 'https://api.darksky.net/forecast/'
const key = '43d7f14e28e4ad05109359319da1a156'
  // units is voor celsius en km
const units = '?units=si'
  // Gerlos, Austria
const latGerlos = '47.2427646064301'
const longGerlos = '12.0240211486816'
  // test location Gerlos
const lat = '52.379189'
const long = '4.899431'


fetch(`${cors}${url}${key}/${latGerlos},${longGerlos}${units}`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(myJson);
  });

// https://skimap.org/pages/Developers#skiArea
// https://skimap.org/SkiAreas/index.xml

import skiaera from './skiareas.js'
console.log(skiaera)

// fetch('https://cors-anywhere.herokuapp.com/skiareas.json')
//   .then((response) => {
//     return response.json();
//   })
//   .then((myJson) => {
//     console.log(myJson)
//     getData(myJson)
//   })



// bron: https://makitweb.com/convert-unix-timestamp-to-date-time-with-javascript/
// function convertUnix() {
//   var unixtimestamp = 1580770800;
//   var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   var date = new Date(unixtimestamp * 1000);
//   var year = date.getFullYear();
//   var month = months_arr[date.getMonth()];
//   var day = date.getDate();
//   var hours = date.getHours();
//   var minutes = "0" + date.getMinutes();
//   var seconds = "0" + date.getSeconds();
//   // Display date time in MM-dd-yyyy h:m:s format
//   var convdataTime = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
//   console.log(convdataTime)
// }

// bron: https://www.youtube.com/watch?time_continue=293&v=wPElVpR1rwA&feature=emb_logo
// function getCurrentlocation {
// window.addEventListener("load", () => {
//     let currentLong;
//     let currentLat;

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//         currentLong = position.coords.longitude;
//         currentLat = position.coords.latitude;
//         console.log(position);
//       });
//     } else {
//       console.log("Sorry, your browser don't support your location")
//     }
//   })
// }