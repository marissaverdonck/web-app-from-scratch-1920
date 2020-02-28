const loadmorebutton = document.querySelector('#loadmore');
const listSkiAreas = document.querySelector('#listSkiAreas')

function renderSkiData(weatherArray) {
  const wrapper = document.querySelector(".wrapper");
  wrapper ? (wrapper.remove(), render(weatherArray)) : render(weatherArray)

  function render(weatherArray) {
    listSkiAreas.insertAdjacentHTML('beforeend',
      `<div class="wrapper">`)

    weatherArray.reduce(function(acc, cur, ind) {
      const wrapper = document.querySelector(".wrapper");
      console.log(wrapper)
      wrapper.insertAdjacentHTML('beforeend', `
    

      <li id="id${cur.id}">
      <a href="#detail${cur.id}/?lat=${cur.lat}/?lon=${cur.lon}">
  
      <article>
      <h4>${cur.name}, ${cur.regio}</h4>
  
      <div>
      <p>Distance: ${cur.distance}km</p>
      <p>Temperature: ${Math.floor(cur.weatherCurrentlyTemp)}˚C</p>
      <p> ${(cur.weatherCurrentlySummery)}</p>
      </div>
  
      <div class="weather">
      <canvas class="currentIcon" id=currentIcon${cur.id} width="128" height"128">${cur.weatherCurrentlyIcon}</canvas> 
      </div>
  
      <div>
      <h5>Next hours</h5>
      <article>
      <p>${cur.weatherHourlyTime0}</p> 
      <canvas class="iconH1" id=iconH1${cur.id}>${cur.weatherHourlyIcon0}</canvas> 
      <p>${Math.floor(cur.weatherHourlyTemp0)}˚C</p>
  
      </article>
  
      <article>
      <p>${cur.weatherHourlyTime3}</p> 
      <canvas class="iconH2" id=iconH2${cur.id}>${cur.weatherHourlyIcon3}</canvas> 
      <p>${Math.floor(cur.weatherHourlyTemp3)}˚C</p>
      </article>
  
      <article>
      <p>${cur.weatherHourlyTime6}</p> 
      <canvas class="iconH3" id=iconH3${cur.id}>${cur.weatherHourlyIcon6}</canvas> 
      <p>${Math.floor(cur.weatherHourlyTemp6)}˚C</p>     
      </div>
      </article>
      <a href="#detail${cur.id}/?lat=${cur.lat}/?lon=${cur.lon}"><button>Read more</button></a>
      </article>
      </a>
      </li>
      </div>
      `)
      setIcons(cur.weatherCurrentlyIcon, document.querySelectorAll('.currentIcon').item(ind))
      setIcons(cur.weatherHourlyIcon0, document.querySelectorAll('.iconH1').item(ind))
      setIcons(cur.weatherHourlyIcon3, document.querySelectorAll('.iconH2').item(ind))
      setIcons(cur.weatherHourlyIcon6, document.querySelectorAll('.iconH3').item(ind))
    }, 0)
  }
  loadmorebutton.classList.add('show')
}

// Bron: https://www.youtube.com/watch?v=wPElVpR1rwA
function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: "white" });
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}

function renderDetailData(weatherDetailData) {
  const wrapper = document.querySelector(".wrapper");
  const location = document.querySelector("#location");
  const search = document.querySelector("#search");
  location.classList.add("off")
  search.classList.add("off")
  wrapper ? (wrapper.remove(), render(weatherDetailData)) : render(weatherDetailData)

  function render(weatherDetailData) {
    listSkiAreas.insertAdjacentHTML('beforeend',
      `<div class="wrapper">
      <a href="index.html"><button>Back to results</button></a>
 <h4>${(weatherDetailData[0].day1).slice(0, 6)}</h4>
 <p> ${(weatherDetailData[0].day1sum)}</p>
      <p>Temperature: ${Math.floor(weatherDetailData[0].day1temp)}˚C</p>
      <p> precipType:${(weatherDetailData[0].day1precip)}</p>
      <p> precip intensity:${(weatherDetailData[0].day1precipInt)} cm.</p>

      <h4>${(weatherDetailData[0].day2).slice(0, 6)}</h4>
      <p> ${(weatherDetailData[0].day2sum)}</p>
           <p>Temperature: ${Math.floor(weatherDetailData[0].day2temp)}˚C</p>
           <p> precipType:${(weatherDetailData[0].day2precip)}</p>
           <p> precip intensity:${(weatherDetailData[0].day2precipInt)} cm.</p>

           <h4>${(weatherDetailData[0].day3).slice(0, 5)}</h4>
           <p> ${(weatherDetailData[0].day3sum)}</p>
                <p>Temperature: ${Math.floor(weatherDetailData[0].day3temp)}˚C</p>
                <p> precipType:${(weatherDetailData[0].day3precip)}</p>
                <p> precip intensity:${(weatherDetailData[0].day3precipInt)} cm.</p>

                <h4>${(weatherDetailData[0].day4).slice(0, 5)}</h4>
                <p> ${(weatherDetailData[0].day4sum)}</p>
                     <p>Temperature: ${Math.floor(weatherDetailData[0].day4temp)}˚C</p>
                     <p> precipType:${(weatherDetailData[0].day4precip)}</p>
                     <p> precip intensity:${(weatherDetailData[0].day4precipInt)} cm.</p>

                     <h4>${(weatherDetailData[0].day5).slice(0, 5)}</h4>
                     <p> ${(weatherDetailData[0].day5sum)}</p>
                          <p>Temperature: ${Math.floor(weatherDetailData[0].day5temp)}˚C</p>
                          <p> precipType:${(weatherDetailData[0].day5precip)}</p>
                          <p> precip intensity:${(weatherDetailData[0].day5precipInt)} cm.</p>
                        
                          <h4>${(weatherDetailData[0].day6).slice(0, 5)}</h4>
                          <p> ${(weatherDetailData[0].day6sum)}</p>
                               <p>Temperature: ${Math.floor(weatherDetailData[0].day6temp)}˚C</p>
                               <p> precipType:${(weatherDetailData[0].day6precip)}</p>
                               <p> precip intensity:${(weatherDetailData[0].day6precipInt)} cm.</p>
      
                               <h4>${(weatherDetailData[0].day7).slice(0, 5)}</h4>
                               <p> ${(weatherDetailData[0].day7sum)}</p>
                                    <p>Temperature: ${Math.floor(weatherDetailData[0].day7temp)}˚C</p>
                                    <p> precipType:${(weatherDetailData[0].day7precip)}</p>
                                    <p> precip intensity:${(weatherDetailData[0].day7precipInt)} cm.</p>
      </li>
      `)
  }

}
loadmorebutton.classList.remove('show')

export { renderSkiData, renderDetailData }