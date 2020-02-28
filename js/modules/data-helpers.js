import { getUserLocation, getTimeZone, success, error } from './userLocation.js';
import skiarea from './skiLocationApi.js'

//bron: http://www.movable-type.co.uk/scripts/latlong.html
function addDistance(currentLat, currentLon, skiarea) {
  console.log(skiarea)
  const skiLocationArray = skiarea.skiAreas.skiArea.map((skiarea, index, array) => {
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
  localStorage.setItem('locationArray', JSON.stringify(skiLocationArray));
  return skiLocationArray;
}

function filterAndSortLocations(locationArray, filterInputMin, filterInputMax) {
  const minDistance = filterInputMin ? filterInputMin : 0;
  const maxDistance = filterInputMax ? filterInputMax : 1000;
  const filteredAreas = locationArray.filter(function(locationArray) {
    // Because of null values in the array, caused by stringify
    const distance = (locationArray == null) ? locationArray = 'undefined' :
      (locationArray.distance == null) ? locationArray.distance = 'undefined' :
      locationArray.distance = locationArray.distance

    const newdata = distance >= minDistance && distance <= maxDistance;

    return newdata
  });

  const filteredSortedLocationArray = filteredAreas.sort((a, b) => (a.distance - b.distance))

  return filteredSortedLocationArray.slice(0, 5)
}

async function getWeather(filterdSortedLocations) {
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const url = 'https://api.darksky.net/forecast/'
  const key = '43d7f14e28e4ad05109359319da1a156'
  const key2 = '6b0215f3cade32440e76bd5a8c70e909'
  const key3 = '41b9df401599f007aff98cfa0c66811d'
    // units is voor celsius en km
  const units = '?units=si'

  const weatherArrayPromises = filterdSortedLocations.map(cur =>
    fetch(`${cors}${url}${key}/${cur.lat},${cur.lon}${units}`)
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      console.log(weatherData)
      return {
        id: cur.id,
        name: cur.name,
        regio: cur.regio,
        lat: cur.lat,
        lon: cur.lon,
        distance: cur.distance,
        weatherCurrentlyIcon: weatherData.currently.icon,
        weatherCurrentlySummery: weatherData.currently.summary,
        weatherCurrentlyTemp: weatherData.currently.temperature,
        weatherHourlyTime0: convertUnix(weatherData.hourly.data[0].time),
        weatherHourlyIcon0: weatherData.hourly.data[0].icon,
        weatherHourlyTemp0: weatherData.hourly.data[0].temperature,
        weatherHourlyTime3: convertUnix(weatherData.hourly.data[3].time),
        weatherHourlyIcon3: weatherData.hourly.data[3].icon,
        weatherHourlyTemp3: weatherData.hourly.data[3].temperature,
        weatherHourlyTime6: convertUnix(weatherData.hourly.data[6].time),
        weatherHourlyIcon6: weatherData.hourly.data[6].icon,
        weatherHourlyTemp6: weatherData.hourly.data[6].temperature
      }
    })
  )
  const data = await Promise.all(weatherArrayPromises)
  return data
}

async function getWeatherDetail(id, latitude, longitude) {
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const url = 'https://api.darksky.net/forecast/'
  const key = '43d7f14e28e4ad05109359319da1a156'
  const key2 = '6b0215f3cade32440e76bd5a8c70e909'
  const key3 = '41b9df401599f007aff98cfa0c66811d'
    // units is voor celsius en km
  const units = '?units=si'

  const lat = latitude.slice(5)
  const lon = longitude.slice(5)
  const dataArray = []
    // const weatherArrayPromises = filterdSortedLocations.map(cur =>
  const data = await fetch(`${cors}${url}${key}/${lat},${lon}${units}`)
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      console.log(weatherData)
      dataArray.push({
        day1: convertUnix(weatherData.daily.data[0].time),
        day1sum: weatherData.daily.data[0].summary,
        day1temp: weatherData.daily.data[0].temperatureLow,
        day1precip: weatherData.daily.data[0].precipType,
        day1precipInt: weatherData.daily.data[0].precipIntensity,

        day2: convertUnix(weatherData.daily.data[1].time),
        day2sum: weatherData.daily.data[1].summary,
        day2temp: weatherData.daily.data[1].temperatureLow,
        day2precip: weatherData.daily.data[1].precipType,
        day2precipInt: weatherData.daily.data[1].precipIntensity,

        day3: convertUnix(weatherData.daily.data[2].time),
        day3sum: weatherData.daily.data[2].summary,
        day3temp: weatherData.daily.data[2].temperatureLow,
        day3precip: weatherData.daily.data[2].precipType,
        day3precipInt: weatherData.daily.data[2].precipIntensity,

        day4: convertUnix(weatherData.daily.data[3].time),
        day4sum: weatherData.daily.data[3].summary,
        day4temp: weatherData.daily.data[3].temperatureLow,
        day4precip: weatherData.daily.data[3].precipType,
        dayprecipInt: weatherData.daily.data[3].precipIntensity,

        day5: convertUnix(weatherData.daily.data[4].time),
        day5sum: weatherData.daily.data[4].summary,
        day5temp: weatherData.daily.data[4].temperatureLow,
        day5precip: weatherData.daily.data[4].precipType,
        day5precipInt: weatherData.daily.data[4].precipIntensity,

        day6: convertUnix(weatherData.daily.data[5].time),
        day6sum: weatherData.daily.data[5].summary,
        day6temp: weatherData.daily.data[5].temperatureLow,
        day6precip: weatherData.daily.data[5].precipType,
        day6precipInt: weatherData.daily.data[5].precipIntensity,

        day7: convertUnix(weatherData.daily.data[6].time),
        day7sum: weatherData.daily.data[6].summary,
        day7temp: weatherData.daily.data[6].temperatureLow,
        day7precip: weatherData.daily.data[6].precipType,
        day7precipInt: weatherData.daily.data[6].precipIntensity,
      })
    })
  return dataArray
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
  const time = month + ' ' + day + ', ' + hours + ':' + minutes.substr(-2);
  return time
}

//User input
function getValueFromFilter() {
  const DistanceArrayString = localStorage.getItem('locationArray')
  const distanceArray = JSON.parse(DistanceArrayString)
  const filterInputMin = document.getElementById("min-distance").value;
  const filterInputMax = document.getElementById("max-distance").value;
  return { distanceArray, filterInputMin, filterInputMax }
  // filterAndSortLocations(distanceArray, filterInputMin, filterInputMax)
}

export { addDistance, filterAndSortLocations, getWeather, getValueFromFilter, getWeatherDetail };