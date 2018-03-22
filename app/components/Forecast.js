import React, { Component } from 'react'
import { parseDegrees } from '../utils'
import { forecastTypes } from '../types'

/* Components */
import Icon from './Icon'

export default class Forecast extends Component {
	render() {
		const  { title, degrees, units, code } = this.props

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