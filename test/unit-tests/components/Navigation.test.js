/* global describe, it, beforeEach, expect, jest */

import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Navigation from '../../../app/components/Navigation'
import Switch from '../../../app/components/Switch'

Enzyme.configure({adapter: new Adapter()})

describe('Navigation', () => {
	let navigation,
		units,
		onClear,
		onUnitChange,
		backElem,
		iconElem,
		cityElem,
		unitsElem,
		switchComponent

	beforeEach(() => {
		units = {
			symbol: 'C'
		}

		onClear = jest.fn()
		onUnitChange = jest.fn()

		navigation = shallow(
			<Navigation city="detroit"
				onClear={onClear}
				onUnitChange={onUnitChange}
				units={units}
			/>
		)

		backElem = navigation.find('.navigation__back')
		iconElem = backElem.find('.material-icons')
		cityElem = navigation.find('.navigation__city')
		unitsElem = navigation.find('.navigation__units')
		switchComponent = unitsElem.find('Switch')
	})

	it('should set correct class name and html tag for root element', () => {
		expect(navigation.hasClass('navigation')).toBeTruthy()
		expect(navigation.type()).toEqual('div')
	})

	it('should render correct amount of elements with correct html tags', () => {
		expect(backElem.length).toEqual(1)
		expect(iconElem.length).toEqual(1)
		expect(cityElem.length).toEqual(1)
		expect(unitsElem.length).toEqual(1)
		expect(switchComponent.length).toEqual(1)

		expect(backElem.type()).toEqual('div')
		expect(iconElem.type()).toEqual('i')
		expect(cityElem.type()).toEqual('h1')
		expect(unitsElem.type()).toEqual('div')
		expect(switchComponent.type()).toEqual(Switch)
	})

	it('should set correct icon and city texts', () => {
		expect(iconElem.text()).toEqual('arrow_back')
		expect(cityElem.text()).toEqual('Detroit')
	})

	it('should set correct Switch component props', () => {
		const switchComponentProps = switchComponent.props()

		expect(switchComponentProps.on).toEqual('°F')
		expect(switchComponentProps.off).toEqual('°C')
		expect(switchComponentProps.name).toEqual('degrees')
		expect(switchComponentProps.units).toEqual(units)
	})

	it('should click on back element', () => {
		backElem.simulate('click')

		expect(onClear.mock.calls.length).toBe(1)
	})

	it('should change on Switch component', () => {
		switchComponent.simulate('change')

		expect(onUnitChange.mock.calls.length).toBe(1)
	})
})
