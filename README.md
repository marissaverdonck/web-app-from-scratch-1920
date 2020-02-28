# Snow hunters
<img width="642" alt="Schermafbeelding 2020-02-28 om 08 16 49" src="https://user-images.githubusercontent.com/43657951/75520196-41976a80-5a05-11ea-9663-a9fbef1fefb6.png">

## Table of Contents
* [Concept](#Concept)
* [Live Desom](#Love-Demo)
* [Onderzoek](#Onderzoek)
* [Installatie](#Installatie)
* [API's](#API's)
* [Data](#Data)
* [How it works](#How-it-works)
  * [Actor diagram](#Actor-diagram)
  * [Interaction diagram](#Interaction-diagram)
* [Feature requirements](#Feature-requirements)
* [Extra Features](#Extra-Features)
* [Wishlist](#Wishlist)
* [Learning goals](#Learning-goals)
* [Credits](#Credits)
* [License](#License)

## Concept
I love to ski! When there is fresh snow in the Alps, then I want to go there immediately if only for a weekend. I look in advance for the closest area with the most snow. This is a lot of work to find out so it would be handy if I build a web app for this. This is a weather application with all data from ski resorts. Search nearby ski resorts to find fresh snow.

## Live Demo
https://marissaverdonck.github.io/web-app-from-scratch-1920/

## Onderzoek
View how I came up with this idea and see the research in the[Wiki](https://github.com/marissaverdonck/web-app-from-scratch-1920/wiki)

## Installation
1. Open up your terminal

2. Go to the file in your computer where you want to install the application

3. Type
```
Git clone https://github.com/marissaverdonck/web-app-from-scratch-1920.git
```

## API's 
### Dark Sky weather API
Website: https://darksky.net/dev


<details>
    <summary>Weather data</summary>

```
latitude: 52.30798332035149
longitude: 5.237298870086647
timezone: "Europe/Amsterdam"
currently:
time: 1582864905
summary: "Clear"
icon: "clear-night"
precipIntensity: 0.005
precipProbability: 0.02
precipType: "rain"
temperature: 2.94
apparentTemperature: -0.85
dewPoint: 2.56
humidity: 0.97
pressure: 1014
windSpeed: 4.29
windGust: 8.39
windBearing: 165
cloudCover: 0.09
uvIndex: 0
visibility: 16.093
ozone: 396.6
__proto__: Object
hourly:
summary: "Light rain starting this evening."
icon: "rain"
data: Array(49)
0:
time: 1582862400
summary: "Clear"
icon: "clear-night"
precipIntensity: 0.0124
precipProbability: 0.08
precipType: "rain"
temperature: 3.37
apparentTemperature: -0.47
dewPoint: 2.99
humidity: 0.97
pressure: 1013.6
windSpeed: 4.56
windGust: 9.29
windBearing: 350
cloudCover: 0.03
uvIndex: 0
visibility: 16.093
ozone: 399.3
```

</details>

### Ski area's around the world
Website: https://skimap.org/pages/Developers#skiArea

<details>
    <summary>Skiarea data</summary>

 ```
    "skiAreas": {
    "skiArea": [{
        "name": {
          "__cdata": " Smokey Mountain Ski Club "
        },
        "officialWebsite": {
          "__cdata": " http://www.skismokey.ca/ "
        },
        "georeferencing": {
          "_lat": "52.977947",
          "_lng": "-66.92094"
        },
        "regions": {
          "region": {
            "_id": "335",
            "__cdata": " Newfoundland and Labrador "
          }
        },
        "_id": "1"
      },
 ```
</details>
## How it works
Visual representation of how the application works.

### Actor diagram
<img width="900" alt="Schermafbeelding 2020-02-11 om 14 10 42" src="https://user-images.githubusercontent.com/43657951/74239582-69ce5c00-4cd8-11ea-8044-7c39c6c4b7ae.png">

### Interaction diagram

<img width="900" alt="Schermafbeelding 2020-02-11 om 14 12 44" src="https://user-images.githubusercontent.com/43657951/74239675-a13d0880-4cd8-11ea-87dd-b4268fcf4c21.png">

## Features
* Retrieving data from 2 API's
* Retrieve the geolocation from the user
* Render data to de overview page and detail page
* Routing
* Filter
* Sort
* Modules

## WishList
* Load more data items by clicking on the button
* User input: sort by
* Option to book a hotel with de booking.com API
* Make more use of local storage
* Actual snow height of the location
* Design the detailpage

## Learning goals
I've learned a lot these days!
* Bring data from different API's together and manipulate them
* .reduce()
* Modules
* Give a loading and error state
* Asynchronous code
* Routing
* Render

## Credits
* Joost Faber
* Laurens Aarnoudse
* Robin Stut 
* Guido Bouman 

## Sources
* [Youtube](https://www.youtube.com/watch?v=wPElVpR1rwA)
* [DarkSky](https://darksky.net/dev)
* [Developer Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

## License
[MIT License](https://github.com/marissaverdonck/web-app-from-cratch/blob/master/license)




