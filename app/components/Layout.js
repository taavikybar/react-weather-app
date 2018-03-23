/* eslint-env browser */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { layoutTypes } from '../types'

/* Actions */
import { setCity, clearCity } from '../actions/cityActions'
import { fetchWeather } from '../actions/weatherActions'
import { fetchForecast } from '../actions/forecastActions'
import { fetchLocation } from '../actions/locationActions'
import { setTemperatureUnits } from '../actions/unitsActions'

/* Components */
import Navigation from './Navigation'
import Weather from './Weather'
import Forecasts from './Forecasts'
import Search from './Search'

/**
 * Main layout component that is hydrated with Redux store
 * and displays Navigation, Weather and Forecasts components
 * if city is selected or Search component if not with appropriate
 * callback functions.
 * Handles dispatching all the actions to Redux store.
 *
 * PROPERTIES
 * @param {string} city - city to search weather for
 * @param {string} location - name of the current location
 * @param {Object} units - temperature units object
 * @param {Object} weather - fetched weather object consisting
 *  * of description, degrees and icon code
 * @param {boolean} weatherFetched - if weather is fetched
 * @param {Array} forecasts - collection of forecasts with day name
 * and a collection of forecasts for the day
 * @param {boolean} forecastsFetched - if forecasts are fetched
 * @param {Object} todaysForecasts - an object containing forecasts for
 * parts of the current day
 * @param {string} error - error text if fetching returns an error
 * @param {Function} dispatch - function to call for dispatching action to Redux store
 *
 * @export Layout
 * @class Layout
 * @extends {React.Component}
 */
export class Layout extends Component {
	constructor(props) {
		super(props)

		this.handleLocationReceived = this.handleLocationReceived.bind(this)
	}

	handleUnitChange(isFahrenheit) {
		this.props.dispatch(setTemperatureUnits(isFahrenheit))
	}

	handleSearch(city) {
		this.props.dispatch(setCity(city))
		this.props.dispatch(fetchWeather(city))
		this.props.dispatch(fetchForecast(city))
	}

	handleLocationReceived() {
		this.handleSearch(this.props.location)
	}

	handleLocation() {
		this.props.dispatch(fetchLocation(this.handleLocationReceived))
	}

	handleReset() {
		this.props.dispatch(clearCity())
	}

	componentDidMount() {
		const app = document.getElementById('app'),
			{ city } = this.props

		setTimeout(() => {
			app.className += 'loaded'
		}, 100)

		/* Update city weather data if city is selected in persistent storage */
		if (city){
			this.handleSearch(city)
		}
	}

	render() {
		const {	city,
				units,
				weather,
				forecasts,
				weatherFetched,
				forecastsFetched,
				todaysForecasts,
				error
			} = this.props,
			displayWeather = !error
				&& city
				&& weatherFetched
				&& forecastsFetched

		return (
			<div className="layout">
				<div className="layout__inner">
					{displayWeather ?
						(
							<React.Fragment>
								<Navigation
									city={city}
									onUnitChange={(change) => this.handleUnitChange(change)}
									onClear={() => this.handleReset()}
									units={units} />

								<Weather
									weather={weather}
									units={units}
									forecasts={todaysForecasts} />

								<Forecasts
									forecasts={forecasts}
									units={units} />
							</React.Fragment>
						) : (
							<React.Fragment>
								<Search
									onSubmit={(change) => this.handleSearch(change)}
									onLocationClick={() => this.handleLocation()}
									error={error} />
							</React.Fragment>
						)
					}
				</div>
			</div>
		)
	}
}

export function mapProps(store) {
	const {
		city,
		weather,
		forecasts,
		location,
		error
	} = store

	return {
		city: city.city,
		location: location.location.city,
		units: store.units,
		weather: weather.weather,
		weatherFetched: weather.fetched,
		forecasts: forecasts.forecasts,
		forecastsFetched: forecasts.fetched,
		todaysForecasts: forecasts.todaysForecasts,
		error: error.error
	}
}

export default connect(mapProps)(Layout)

Layout.propTypes = layoutTypes