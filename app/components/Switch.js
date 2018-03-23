import React, { Component } from 'react'
import { switchTypes } from '../types'

/**
 * Component thatdisplays a toggle switch to toggle
 * between two values
 *
 * PROPERTIES
 * @param {string} name - name of switch to use for binding together
 * the input and the label
 * @param {string} on - text of the switch when in on position
 * @param {string} off - text of the switch when in off position
 * @param {Function} onChange - function to call when the switch changes
 * @param {Object} units - temperature units object
 *
 * @export Switch
 * @class Switch
 * @extends {React.omponent}
 */
export default class Switch extends Component {
	constructor(props) {
		super(props)

		this.state = {
			checked: this.props.units.symbol === 'F'
		}

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const checked = event.target.checked

		this.setState({
			checked
		})

		this.props.onChange(checked)
	}

	render() {
		const { name, on, off } = this.props

		return (
			<div className="switch">
				<input type="checkbox"
					id={name}
					className="switch__checkbox"
					checked={this.state.checked}
					onChange={this.handleChange} />

				<label className="switch__label"
					htmlFor={name}>
					<span className="switch__inner"
						data-on={on}
						data-off={off}>
					</span>
					<span className="switch__toggle"></span>
				</label>
			</div>
		)
	}
}

Switch.propTypes = switchTypes