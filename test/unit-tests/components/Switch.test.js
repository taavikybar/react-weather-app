/* global describe, it, beforeEach, expect, jest */

import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Switch from '../../../app/components/Switch'

Enzyme.configure({adapter: new Adapter()})

describe('Switch', () => {
	let switchComponent,
		units,
		checkBoxElem,
		labelElem,
		switchInnerElem,
		switchToggleElem,
		checkBoxElemProps,
		labelElemProps,
		switchInnerElemProps,
		onChange

	beforeEach(() => {
		units = {
			symbol: 'C'
		}

		onChange = jest.fn()

		switchComponent = shallow(
			<Switch name="degrees"
				on="F"
				off="C"
				units={units}
				onChange={onChange}
			/>
		)

		checkBoxElem = switchComponent.find('.switch__checkbox')
		labelElem = switchComponent.find('.switch__label')
		switchInnerElem = labelElem.find('.switch__inner')
		switchToggleElem = labelElem.find('.switch__toggle')
		checkBoxElemProps = checkBoxElem.props()
		labelElemProps = labelElem.props()
		switchInnerElemProps = switchInnerElem.props()
	})

	it('should set correct class name and html tag for root element', () => {
		expect(switchComponent.hasClass('switch')).toBeTruthy()
		expect(switchComponent.type()).toEqual('div')
	})

	it('should render correct amount of elements with correct html tags', () => {
		expect(checkBoxElem.length).toEqual(1)
		expect(labelElem.length).toEqual(1)
		expect(switchInnerElem.length).toEqual(1)
		expect(switchToggleElem.length).toEqual(1)

		expect(checkBoxElem.type()).toEqual('input')
		expect(labelElem.type()).toEqual('label')
		expect(switchInnerElem.type()).toEqual('span')
		expect(switchToggleElem.type()).toEqual('span')
	})

	it('should set correct attributes for input element', () => {
		expect(checkBoxElemProps.type).toEqual('checkbox')
		expect(checkBoxElemProps.id).toEqual('degrees')
		expect(checkBoxElemProps.className).toEqual('switch__checkbox')
		expect(checkBoxElemProps.checked).toBeFalsy()
		expect(typeof checkBoxElemProps.onChange).toEqual('function')
	})

	it('should set correct attributes for label element', () => {
		expect(labelElemProps.htmlFor).toEqual('degrees')
	})

	it('should set correct attributes for switch inner element', () => {
		expect(switchInnerElemProps['data-on']).toEqual('F')
		expect(switchInnerElemProps['data-off']).toEqual('C')
	})

	it('should set checkbox to checked if unit props symbol is F', () => {
		units = {
			symbol: 'F'
		},
		switchComponent = shallow(<Switch units={units} />),
		checkBoxElem = switchComponent.find('.switch__checkbox'),
		checkBoxElemProps = checkBoxElem.props()

		expect(checkBoxElemProps.checked).toBeTruthy()
	})

	it('should call props.onChange with correct params on checkbox change event', () => {
		checkBoxElem.simulate('change', {
			target: {
				checked: true
			}
		})

		checkBoxElem = switchComponent.find('.switch__checkbox')

		expect(onChange.mock.calls.length).toBe(1)
		expect(onChange.mock.calls[0][0]).toBeTruthy()
	})
})
