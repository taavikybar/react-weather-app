/* global describe, it, beforeEach, expect */

import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Forecasts from '../../../app/components/Forecasts'
import Icon from '../../../app/components/Icon'

Enzyme.configure({adapter: new Adapter()})

describe('Forecasts', () => {
	let units,
		forecasts,
		forecastsList,
		forecastsDayElems,
		forecastsIconElems,
		forecastsIconComponents

	beforeEach(() => {
		forecastsList = [
			{
				day: 'Monday',
				forecasts: [
					{
						hours: 9,
						id: 1,
						degrees: 5
					},
					{
						hours: 12,
						id: 2,
						degrees: 6
					},
					{
						hours: 16,
						id: 3,
						degrees: 7
					}
				]
			},
			{
				day: 'Tuesday',
				forecasts: [
					{
						hours: 14,
						id: 1,
						degrees: 8
					},
					{
						hours: 2,
						id: 2,
						degrees: 9
					},
					{
						hours: 99,
						id: 3,
						degrees: 10
					}
				]
			}
		]

		units = {
			symbol: 'C'
		}

		forecasts = shallow(
			<Forecasts units={units}
				forecasts={forecastsList}
				/>
		)

		forecastsDayElems = forecasts.find('.forecasts__day'),
		forecastsIconElems = forecasts.find('.forecasts__icon'),
		forecastsIconComponents = forecasts.find('Icon')
	})

	it('should set correct class name and html tag for root element', () => {
		expect(forecasts.hasClass('forecasts')).toBeTruthy()
		expect(forecasts.type()).toEqual('ul')
	})

	it('should render correct amount of elements', () => {
		expect(forecastsDayElems.length).toEqual(2)
		expect(forecastsIconElems.length).toEqual(2)
		expect(forecastsIconComponents.length).toEqual(2)

		expect(forecastsDayElems.first().type()).toEqual('li')
		expect(forecastsIconElems.first().type()).toEqual('p')
		expect(forecastsIconComponents.first().type()).toEqual(Icon)
	})

	it('should set the correct day titles', () => {
		const firstDayTItleElem = forecastsDayElems.at(0).find('p').at(0),
			secondDayTItleElem = forecastsDayElems.at(1).find('p').at(0)

		expect(firstDayTItleElem.text()).toEqual('Monday')
		expect(secondDayTItleElem.text()).toEqual('Tuesday')
	})

	it('should set correct Icons props', () => {
		const firstIconComponent = forecastsIconComponents.at(0),
			secondIconComponent = forecastsIconComponents.at(1)

		expect(firstIconComponent.props().code).toEqual(2)
		expect(secondIconComponent.props().code).toEqual(1)
	})

	it('should set the correct degrees', () => {
		const firstDayDegreesElem = forecastsDayElems.at(0).find('p').at(2),
			secondDayDegreesElem = forecastsDayElems.at(1).find('p').at(2)

		expect(firstDayDegreesElem.text()).toEqual('6°C')
		expect(secondDayDegreesElem.text()).toEqual('8°C')
	})
})
