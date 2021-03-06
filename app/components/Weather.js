import React, { Component } from 'react'
import Moment from 'react-moment'
import { parseDegrees } from '../utils'
import { weatherTypes } from '../types'

/* Components */
import Icon from './Icon'
import Forecast from './Forecast'

/**
 * Component that displays formatted current date,
 * weather description, current weather degrees and weather icon
 * and all possible weather forecasts for the current day
 *
 * PROPERTIES
 * @param {Object} weather - weather object with description, degrees and icon code
 * @param {Object} units - temperature units object
 * @param {Object} forecasts - current day forecasts object where each key
 * contains a specific part of the day forecast (morning|day|evening|night)
 *
 * @export Weather
 * @class Weather
 * @extends {React.Component}
 */
export default class Weather extends Component {
	render() {
		const { weather, units, forecasts } = this.props,
			currentDate = new Date()

		return (
			<div className="weather">
				<div className="weather__date">
					<Moment date={currentDate}
						format="dddd, MMMM Do YYYY" />
				</div>

				<div className="weather__description">
					{weather.description}
				</div>

				<div className="weather__current">
					<div className="weather__current-degrees">
						{parseDegrees(weather.degrees, units.symbol)}
					</div>

					<div className="weather__current-icon">
						<Icon code={weather.id} />
					</div>

					<div className="weather__forecasts">
						<div className="weather__forecasts-inner">
							{forecasts.morning &&
								<Forecast title="Morning"
									degrees={forecasts.morning.degrees}
									units={units}
									code={forecasts.morning.id} />
							}

							{forecasts.day &&
								<Forecast title="Day"
									degrees={forecasts.day.degrees}
									units={units}
									code={forecasts.day.id} />
							}

							{forecasts.evening &&
								<Forecast title="Evening"
									degrees={forecasts.evening.degrees}
									units={units}
									code={forecasts.evening.id} />
							}

							{forecasts.night &&
								<Forecast title="Night"
									degrees={forecasts.night.degrees}
									units={units}
									code={forecasts.night.id} />
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Weather.propTypes = weatherTypes