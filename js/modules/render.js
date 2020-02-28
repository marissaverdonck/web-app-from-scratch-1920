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
      <a href="#detail.html/id${cur.id}">
  
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
  <a href="detail/#id${cur.id}"><button>Read more</button></a>
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

function renderDetailiData(id) {
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
      <a href="detail/id:${cur.id}">
  
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
  <a href="#detail/id${cur.id}"><button>Read more</button></a>

      </a>
      </li>
      `)

      setIcons(cur.weatherCurrentlyIcon, document.querySelectorAll('.currentIcon').item(ind))
      setIcons(cur.weatherHourlyIcon0, document.querySelectorAll('.iconH1').item(ind))
      setIcons(cur.weatherHourlyIcon3, document.querySelectorAll('.iconH2').item(ind))
      setIcons(cur.weatherHourlyIcon6, document.querySelectorAll('.iconH3').item(ind))



    })
  }
}


export { renderSkiData }