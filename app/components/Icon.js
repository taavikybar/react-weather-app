import React, { Component } from 'react'
import iconsMap from '../fixtures/icons-map.json'
import { iconTypes } from '../types'

/**
 * Component displays an icon with the correct
 * classes retrieved by given code from a icons fixture
 *
 * PROPERTIES
 * @param {number} code - code of the icon
 *
 * @export Icon
 * @class Icon
 * @extends {React.Component}
 */
export default class Icon extends Component {
	render() {
		const { code } = this.props,
			iconMap = iconsMap[code]

		let classes = 'wi wi-'

		if (!iconMap) {
			return ''
		}

		let icon = iconMap.icon

		if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
			icon = 'day-' + icon
		}

		classes = `${classes}${icon}`

		return <i className={classes}></i>
	}
}

Icon.propTypes = iconTypes