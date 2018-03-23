import React, { Component } from 'react'
import { searchTypes } from '../types'

/**
 * Component that displays a form with a search input, search button,
 * fetching errors and text with a link to offer using current location
 *
 * PROPERTIES
 * @param {Function} onSubmit - function to call when submitting the form
 * @param {Function} onLocationClick - function to call when clicking
 * the "use current location" link
 * @param {string} error - error text to display
 *
 * @export Search
 * @class Search
 * @extends {React.Component}
 */
export default class Search extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSearchClick = this.handleSearchClick.bind(this)
		this.handleLocationClick = this.handleLocationClick.bind(this)
	}

	handleChange(event) {
		const value = event.target.value

		this.setState({
			value
		})
	}

	handleSubmit(event) {
		event.preventDefault()

		this.props.onSubmit(this.state.value)
	}

	handleSearchClick(event) {
		event.preventDefault()

		this.props.onSubmit(this.state.value)
	}

	handleLocationClick(event) {
		event.preventDefault()

		this.props.onLocationClick()
	}

	render() {
		return (
			<form className="search"
				onSubmit={this.handleSubmit}>
				<div className="search__inner">
					<div className="search__input-wrapper">
						<input className="search__input"
							type="text"
							placeholder="City"
							onChange={this.handleChange} />

						<a href="#"
							className="search__button"
							onClick={this.handleSearchClick}>
							<i className="material-icons">search</i>
						</a>
					</div>

					<div className="search__error">
						{this.props.error}
					</div>

					<p>or</p>

					<div className="search__location">
						use my <a href="#" onClick={this.handleLocationClick}>current location</a>
					</div>
				</div>
			</form>
		)
	}
}

Search.propTypes = searchTypes