import React, { Component } from 'react'
import { navigationTypes } from '../types'
import { capitalize } from '../utils'

/* Components */
import Switch from './Switch'

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