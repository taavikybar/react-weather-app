import React, { Component } from 'react'
import { navigationTypes } from '../types'
import { capitalize } from '../utils'

/* Components */
import Switch from './Switch'

/**
 * Component displays navigation area
 * with back arrow button, city name as title
 * and degrees units switch
 *
 * PROPERTIES
 * @param {string} city - name of the city to display as title
 * @param {Function} onClear - function to call when clicking the back arrow button
 * @param {Function} onUnitChange - function to call when using the degrees units switch
 * @param {Object} units - temperature units object
 *
 * @export Navigation
 * @class Navigation
 * @extends {React.Component}
 */
export default class Navigation extends Component {
	render() {
		const { city, onClear, onUnitChange, units } = this.props

		return (
			<div className="navigation">
				<div className="navigation__back"
					onClick={onClear}>
					<i className="material-icons">arrow_back</i>
				</div>

				<h1 className="navigation__city">
					{capitalize(city)}
				</h1>

				<div className="navigation__units">
					<Switch on="°F"
						off="°C"
						name="degrees"
						units={units}
						onChange={onUnitChange}/>
				</div>
			</div>
		)
	}
}

Navigation.propTypes = navigationTypes