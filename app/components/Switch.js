import React, { Component } from 'react'
import { switchTypes } from '../types'

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