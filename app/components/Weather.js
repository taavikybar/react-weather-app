import React, { Component } from 'react'
import Moment from 'react-moment'
import { parseDegrees } from '../utils'
import { weatherTypes } from '../types'

/* Components */
import Icon from './Icon'
import Forecast from './Forecast'

export default class Weather extends Component {
	render() {
		const { weather, units, forecasts } = this.props,
			dateToFormat = new Date()

		return (
			<div className="weather">
				<div className="weather__date">
					<Moment date={dateToFormat}
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
								<Forecast  title="Day"
									degrees={forecasts.day.degrees}
									units={units}
									code={forecasts.day.id} />
							}

							{forecasts.evening &&
								<Forecast  title="Evening"
									degrees={forecasts.evening.degrees}
									units={units}
									code={forecasts.evening.id} /> 
							}

							{forecasts.night &&
								<Forecast  title="Night"
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