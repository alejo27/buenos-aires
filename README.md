This is the 5th project of the Web Development Nanodegree.

Here's a brief description of the code and organization.

Runnig the application
=
First clone this repository. Once cloned, type:
```sh
npm install
```

Make sure you have webpack installed globally
```sh
npm install -g webpack
```

Once that done, type:
```sh
webpack --watch
```

And then open `index.html` in your browser.

Code organization
=

The sturcture is as follows:
```
  |
  |
  |--- dist -> This folder contains the minified javascript plus sourcemaps
  |--- js
       |--- api.js -> A helper to make API calls
       |--- index.js -> Entry point of the application
       |--- landmark.js -> This object represents a Landmark on the map
       |--- map.js -> This is a wrapper for the Google Map
       |--- viewmodel.js -> This is the main viewmodel that handles the application
  |--- node_modules -> All dependencies for the project
  |--- scss
       |--- _variables.scss -> Partial with style variables
       |--- style.scss -> Styling rules for the application
  |--- templates
       |--- foursquare.url -> A URL template to call the Foursquare API
       |--- info-window.html -> An HTML template for the info window displayed
       |--- place.html -> An HTML template to display a link to a place around a Landmark
       |--- templates.js A component that exposes templates used by api.js
       |--- wikipedia.url A URL template to call the Wikipedia API
  |--- .editorconfig -> A file that specified editor preferences for the project. See www.editorconfig.org
  |--- index.html -> The main page of the application
  |--- package.json -> Defined the application dependencies
  |--- README.md -> This file
  |--- webpack.config.js -> Webpack's configuration file
```

Webpack
==
Webpack is being used to use CommonJS dependencies on the application. This way the code can be modularized easily.

Also, webpack will process sass to create css, and read template files in order to use them inside the application.

