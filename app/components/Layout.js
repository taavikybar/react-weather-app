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

@connect((store) => {
	const {
		city,
		weather,
		forecasts,
		location
	} = store

	return {
		city: city.city,
		location: location.location.city,
		locationError: location.error,
		units: store.units,
		weather: weather.weather,
		weatherFetched: weather.fetched,
		weatherError: weather.error,
		forecasts: forecasts.forecasts,
		forecastsFetched: forecasts.fetched,
		forecastsError: forecasts.error,
		todaysForecasts: forecasts.todaysForecasts
	}
})
export default class Layout extends Component {
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
		const app = document.getElementById('app')

		setTimeout(() => {
			app.className += 'loaded'
		}, 100)
	}

	render() {
		const {
				city,
				units,
				weather,
				forecasts,
				weatherFetched,
				weatherError,
				forecastsFetched,
				forecastsError,
				locationError,
				todaysForecasts
			} = this.props,
			errorText = weatherError || forecastsError || locationError,
			displayWeather = !locationError
				&& !weatherError
				&& !forecastsError
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
									error={errorText} />
							</React.Fragment>
						)
					}
				</div>
			</div>
		)
	}
}

Layout.propTypes = layoutTypes