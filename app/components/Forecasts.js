import React, { Component } from 'react'
import { parseDegrees } from '../utils'
import { forecastsTypes } from '../types'

/* Components */
import Icon from './Icon'

/**
 * Component displays forecasts list
 * with name of the day, weather icon and degrees
 *
 * PROPERTIES
 * @param {Array} forecasts - collection of forecasts with day name
 * and a collection of forecasts for the day
 * @param {Object} units - temperature units object
 *
 * @export Forecasts
 * @class Forecasts
 * @extends {React.Component}
 */
export default class Forecasts extends Component {
	getDayTemperature(forecasts) {
		const midDayTime = 14

		let dayForecast = {},
			offset = 9999

		forecasts.forEach(forecast => {
			const currentOffset = Math.abs(forecast.hours - midDayTime)

			if (currentOffset < offset) {
				offset = currentOffset
				dayForecast = forecast
			}
		})

		return dayForecast
	}

	render() {
		const { forecasts, units } = this.props,
			forecastsList = forecasts.map((forecast, key) => {
				const dayForecast = this.getDayTemperature(forecast.forecasts)

				return (
					<li key={key}
						className="forecasts__day">
							<p>
								{forecast.day}
							</p>

							<p className="forecasts__icon">
								<Icon code={dayForecast.id} />
							</p>

							<p>
								{parseDegrees(dayForecast.degrees, units.symbol)}
							</p>
					</li>
				)
			})

		return (
			<ul className="forecasts">
				{forecastsList}
			</ul>
		)
	}
}

Forecasts.propTypes = forecastsTypes