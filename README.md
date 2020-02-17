# Snow hunters
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

Ik ben gek op skiën! Wanneer er verse sneeuw valt in de Alpen rijd ik het liefste direct heen, al is het voor een weekendje. Van te voren zoek ik naar het dichtstbijzijnde gebied met de meeste sneeuw. Dit is veel werk om uit te zoeken dus het zou handig zijn als ik hier een webapp voor bouw!

## Live Demo
https://marissaverdonck.github.io/web-app-from-scratch-1920/

## Onderzoek
Bekijk hoe ik op dit idee gekomen ben en zie het onderzoek in de [Wiki](https://github.com/marissaverdonck/web-app-from-scratch-1920/wiki)

## Installatie
1. Open de terminal

2. Navigeer in de CLI naar de map waar de applicatie geinstaleerd kan worden

3. Type <br/>
```
Git clone https://github.com/marissaverdonck/web-app-from-scratch-1920.git
```

## API's 
### Dark Sky weather API
Website: https://darksky.net/dev

<details>
    <summary>Weather data</summary>

    ```json
    data
    ```

</details>

### Ski area's around the world
Website: https://skimap.org/pages/Developers#skiArea

<details>
    <summary>Skiarea data</summary>

    ```json
    data
    ```

</details>

### Google maps - Distance Matrix API
Website: https://developers.google.com/maps/documentation/distance-matrix/intro

<details>
    <summary>Distance data</summary>

    ```json
    data
    ```
</details>


## Data

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




