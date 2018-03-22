/* global describe, it, beforeEach, expect, jest */

import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Search from '../../../app/components/Search'

Enzyme.configure({adapter: new Adapter()})

describe('Search', () => {
	let search,
		onSubmit,
		onLocationClick,
		error,
		innerElem,
		inputWrapperElem,
		inputElem,
		buttonElem,
		iconElem,
		errorElem,
		locationElem,
		locationLinkElem

	beforeEach(() => {
		onSubmit = jest.fn()
		onLocationClick = jest.fn()
		error = 'some error'

		search = shallow(
			<Search city="detroit"
				onSubmit={onSubmit}
				onLocationClick={onLocationClick}
				error={error}
			/>
		)

		innerElem = search.find('.search__inner')
		inputWrapperElem = innerElem.find('.search__input-wrapper')
		inputElem = inputWrapperElem.find('.search__input')
		buttonElem = inputWrapperElem.find('.search__button')
		iconElem = buttonElem.find('.material-icons')
		errorElem = innerElem.find('.search__error')
		locationElem = innerElem.find('.search__location')
		locationLinkElem = locationElem.find('a')
	})

	it('should set correct class name and html tag for root element', () => {
		expect(search.hasClass('search')).toBeTruthy()
		expect(search.type()).toEqual('form')
	})

	it('should render correct amount of elements with correct html tags', () => {
		expect(innerElem.length).toEqual(1)
		expect(inputWrapperElem.length).toEqual(1)
		expect(inputElem.length).toEqual(1)
		expect(buttonElem.length).toEqual(1)
		expect(iconElem.length).toEqual(1)
		expect(errorElem.length).toEqual(1)
		expect(locationElem.length).toEqual(1)
		expect(locationLinkElem.length).toEqual(1)

		expect(innerElem.type()).toEqual('div')
		expect(inputWrapperElem.type()).toEqual('div')
		expect(inputElem.type()).toEqual('input')
		expect(buttonElem.type()).toEqual('a')
		expect(iconElem.type()).toEqual('i')
		expect(errorElem.type()).toEqual('div')
		expect(locationElem.type()).toEqual('div')
		expect(locationLinkElem.type()).toEqual('a')
	})

	it('should set corrent attributes for input element', () => {
		const inputElemProps = inputElem.props()

		expect(inputElemProps.type).toEqual('text')
		expect(inputElemProps.placeholder).toEqual('City')
	})

	it('should set correct content for error element', () => {
		expect(errorElem.text()).toEqual('some error')
	})

	it('should set correct content for location element', () => {
		expect(locationElem.text()).toEqual('use my current location')
	})

	it('should call props.onSubmit with state.value on form submit event', () => {
		const preventDefaultMock = jest.fn()

		search.setState({
			value: 'some value'
		})

		search.simulate('submit', {
			preventDefault: preventDefaultMock
		})

		expect(onSubmit).toHaveBeenCalledTimes(1)
		expect(onSubmit).toHaveBeenCalledWith('some value')
	})

	it('should update the state on input change event', () => {
		inputElem.simulate('change', {
			target: {
				value: 'new value'
			}
		})

		expect(search.state('value')).toEqual('new value')
	})

	it('should call props.onSubmit with state.value and event.preventDefault on search button click event', () => {
		const preventDefaultMock = jest.fn()

		search.setState({
			value: 'some value'
		})

		buttonElem.simulate('click', {
			preventDefault: preventDefaultMock
		})

		expect(onSubmit).toHaveBeenCalledTimes(1)
		expect(onSubmit).toHaveBeenLastCalledWith('some value')
		expect(preventDefaultMock).toHaveBeenCalledTimes(1)
	})

	it('should calls props.onLocationClick and event.preventDefault on location button click event', () => {
		const preventDefaultMock = jest.fn()

		locationLinkElem.simulate('click', {
			preventDefault: preventDefaultMock
		})

		expect(onLocationClick).toHaveBeenCalledTimes(1)
		expect(preventDefaultMock).toHaveBeenCalledTimes(1)
	})
})
