[![Build Status](https://travis-ci.org/taavikybar/react-weather-app.svg?branch=master)](https://travis-ci.org/taavikybar/react-weather-app)

# React Weather app

#### Application retrieves and displays weather information with forecasts by searching for city or using current location

## How to use
Clone repo and install

```
npm clone git@github.com:taavikybar/react-weather-app.git
npm i
```

Run server

```
npm run start
```

Or run Webpack Dev server

```
npm run dev
```

App is running at [http://localhost:4300/](http://localhost:4300/)

For live demo got to [Demo page](http://weather.blkmrktdesigns.com/)

### Tests
[Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/) are used for unit testing

Run tests:

```
npm run test
npm run test-watch
``` 

Coverage report:

```
npm run coverage
```
generates a line coverage report into `./coverage` folder

### Linting

To run [ESLint](https://eslint.org/):

```
npm run lint
```

### Documentation
To re-generate documentation using [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown) run:

```
npm run create-docs
```
NB! It will delete all the docs files first

### Components
- [Layout](docs/components/Layout.md)
- [Search](docs/components/Search.md)
- [Navigation](docs/components/Navigation.md)
- [Weather](docs/components/Weather.md)
- [Forecasts](docs/components/Forecasts.md)
- [Forecast](docs/components/Forecast.md)
- [Switch](docs/components/Switch.md)
- [Icon](docs/components/Icon.md)
