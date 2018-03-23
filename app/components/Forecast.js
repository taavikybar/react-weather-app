import React, { Component } from 'react'
import { parseDegrees } from '../utils'
import { forecastTypes } from '../types'

/* Components */
import Icon from './Icon'

/**
 * Component displays a single forecast item
 * with title, degrees and a weather icon
 *
 * PROPERTIES
 * @param {string} title - title of the forecast
 * @param {number} degrees - degrees to display
 * @param {number} code - icon code
 * @param {Object} units - temperature units object
 *
 * @export Forecast
 * @class Forecast
 * @extends {React.Component}
 * @module Forecast
 */
export default class Forecast extends Component {
	render() {
		const { title, degrees, units, code } = this.props

		return (
			<dl className="forecast">
				<dt>{title}</dt>
				<dd>
					<p className="forecast__degrees">{parseDegrees(degrees, units.symbol)}</p>
					<Icon code={code} />
				</dd>
			</dl>
		)
	}
}

Forecast.propTypes = forecastTypes