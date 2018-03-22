/* global describe, it, beforeEach, expect */

import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Forecast from '../../../app/components/Forecast'
import Icon from '../../../app/components/Icon'

Enzyme.configure({adapter: new Adapter()})

describe('Forecast', () => {
	let units,
		forecast,
		dtElem,
		ddElem,
		forecastDegreesElem,
		forecastIconComponent

	beforeEach(() => {
		units = {
			symbol: 'C'
		}
		
		forecast = shallow(
			<Forecast title="night"
				degrees="10"
				units={units}
				code="rainy"
			/>
		)

		dtElem = forecast.find('dt'),
		ddElem = forecast.find('dd'),
		forecastDegreesElem = ddElem.find('.forecast__degrees'),
		forecastIconComponent = ddElem.find('Icon')
	})

	it('should set correct class name and html tag for root element', () => {
		expect(forecast.hasClass('forecast')).toBeTruthy()
		expect(forecast.type()).toEqual('dl')
	})

	it('should render correct amount of elements with correct html tags', () => {
		expect(dtElem.length).toEqual(1)
		expect(ddElem.length).toEqual(1)
		expect(forecastDegreesElem.length).toEqual(1)
		expect(forecastIconComponent.length).toEqual(1)

		expect(dtElem.type()).toEqual('dt')
		expect(ddElem.type()).toEqual('dd')
		expect(forecastDegreesElem.type()).toEqual('p')
		expect(forecastIconComponent.type()).toEqual(Icon)
	})

	it('should set the correct content', () => {
		expect(dtElem.text()).toEqual('night')
		expect(forecastDegreesElem.text()).toEqual('10°C')
	})

	it('should set correct Icon props', () => {
		expect(forecastIconComponent.props().code).toEqual('rainy')
	})
})
