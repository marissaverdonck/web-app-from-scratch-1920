# Snow hunters
<img width="1253" alt="Schermafbeelding 2020-02-28 om 08 19 34" src="https://user-images.githubusercontent.com/43657951/75519255-1ad83480-5a03-11ea-8c8f-69db4901fa19.png">


Een weer app voor alle skigebieden over de wereld. Waar vind je zo dicht bij mogelijk de meeste sneeuw?

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
A weather application with all data from ski resorts. Search nearby ski resorts to find fresh snow.
I love to ski! When there is fresh snow in the Alps, then I want to go there immediately if only for a weekend.
Ik ben gek op skiën! Wanneer er verse sneeuw valt in de Alpen rijd ik het liefste direct heen, al is het voor een weekendje. I look in advance for the closest area with the most snow. This is a lot of work to find out so it would be handy if I build a web app for this!

## Live Demo
https://marissaverdonck.github.io/web-app-from-scratch-1920/

## Onderzoek
View how I came up with this idea and see the research in the[Wiki](https://github.com/marissaverdonck/web-app-from-scratch-1920/wiki)

## Installatie
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




## How it works
Visuele weergave over hoe de applicatie werkt.

### Actor diagram
<img width="900" alt="Schermafbeelding 2020-02-11 om 14 10 42" src="https://user-images.githubusercontent.com/43657951/74239582-69ce5c00-4cd8-11ea-8044-7c39c6c4b7ae.png">

### Interaction diagram

<img width="900" alt="Schermafbeelding 2020-02-11 om 14 12 44" src="https://user-images.githubusercontent.com/43657951/74239675-a13d0880-4cd8-11ea-87dd-b4268fcf4c21.png">

## Feature recuirements

* Retrieve data from an API and render it in an overview page. (_[Excercises](https://github.com/cmda-minor-web/web-app-from-scratch-1920/blob/master/course/week-1.md)_,
_[Slides](https://drive.google.com/open?id=1Rjl9xqXoKniQSRJPdkU1O5YwWC33SJK8KiV0a-H_xZU)_)


* Design the web app. Add routes and states. Rendering detail page. (_[Excercises](https://github.com/cmda-minor-web/web-app-from-scratch-1920/blob/master/course/week-2.md)_,
_[Slides](https://drive.google.com/open?id=1IqQeu1m0dQiSC_KCvrn8eencAgtYe7X6qT-gm0n9Bmc)_)

* Manipulate data. Split code into modules. Reflect on end result. (_[Excercises](https://github.com/cmda-minor-web/web-app-from-scratch-1920/blob/master/course/week-3.md)_, 
_[Slides](https://drive.google.com/open?id=1BSzGYNLMgtHD4HRnK7f0DgyTv4Pg3xsQwD_eYNo7v0Y)_)


## Extra features

## WishList
* De optie om een hotel te boeken


## Learning goals
* _You can add structure to your code by applying patterns. You can defend the choice for the chosen patterns_
* _You can retrieve data, manipulate it and dynamically convert it to html elements using templating_
* _You understand how you can work with an external API using asynchronous code_
* _You understand how you can manage state in your application and you inform the user of state where necessary_

## Credits

## License
[MIT License](https://github.com/marissaverdonck/web-app-from-cratch/blob/master/license)




