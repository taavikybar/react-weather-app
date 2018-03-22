/* global describe, it, beforeEach, expect, jest, afterEach, document, setTimeout */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

/* Actions */
import { setCity, clearCity } from '../../../app/actions/cityActions'
import { fetchWeather } from '../../../app/actions/weatherActions'
import { fetchForecast } from '../../../app/actions/forecastActions'
import { fetchLocation } from '../../../app/actions/locationActions'
import { setTemperatureUnits } from '../../../app/actions/unitsActions'

/* Components */
import { Layout } from '../../../app/components/Layout'
import Search from '../../../app/components/Search'
import Navigation from '../../../app/components/Navigation'
import Weather from '../../../app/components/Weather'
import Forecasts from '../../../app/components/Forecasts'

Enzyme.configure({adapter: new Adapter()})

jest.mock('../../../app/actions/cityActions', () => {
	return {
		setCity: jest.fn(),
		clearCity: jest.fn()
	}
})

jest.mock('../../../app/actions/weatherActions', () => {
	return {
		fetchWeather: jest.fn()
	}
})

jest.mock('../../../app/actions/forecastActions', () => {
	return {
		fetchForecast: jest.fn()
	}
})

jest.mock('../../../app/actions/locationActions', () => {
	return {
		fetchLocation: jest.fn((cb) => cb())
	}
})

jest.mock('../../../app/actions/unitsActions', () => {
	return {
		setTemperatureUnits: jest.fn()
	}
})

jest.useFakeTimers()

describe('Layout', () => {
	let layout,
		props,
		layoutInner,
		searchComponent,
		navigationComponent,
		weatherComponent,
		forecastsComponent,
		appElem

	beforeEach(() => {
		appElem = {
			className: 'app '
		}

		document.getElementById = jest.fn(() => appElem)

		props = {
			city: '',
			location: 'Tallinn',
			locationError: 'location error',
			units: 'C',
			weather: {
				rainy: true
			},
			weatherFetched: false,
			weatherError: 'weather error',
			forecasts: [
				{
					degrees: 4
				},
				{
					degrees: 10
				}
			],
			todaysForecasts: {
				day: 'warm',
				night: 'cold'
			},
			forecastsFetched: false,
			forecastsError: 'forecasts error',
			dispatch: jest.fn()
		}

		layout = shallow( <Layout {...props} /> )
		layoutInner = layout.find('.layout__inner')
		searchComponent = layout.find('Search')
	})

	afterEach(() => {
		setCity.mockClear()
		clearCity.mockClear()
		fetchWeather.mockClear()
		fetchForecast.mockClear()
		fetchLocation.mockClear()
		setTemperatureUnits.mockClear()
		document.getElementById.mockRestore()
	})

	it('should set correct class name and html tag for root element', () => {
		expect(layout.hasClass('layout')).toBeTruthy()
		expect(layout.type()).toEqual('div')
	})

	it(`should set app element class name,
		call document.getElementById and setTimeout on component mount lifecycle event`, () => {
		expect(document.getElementById).toHaveBeenCalledTimes(1)
		expect(document.getElementById).toHaveBeenLastCalledWith('app')

		expect(setTimeout).toHaveBeenCalledTimes(2)
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100)

		jest.runOnlyPendingTimers()

		expect(appElem.className).toEqual('app loaded')
	})

	describe('displayWeather is true', () => {
		beforeEach(() => {
			props.city = 'Chicago'
			props.locationError = null
			props.weatherError = null
			props.weatherFetched = true
			props.forecastsError = null
			props.forecastsFetched = true

			layout = shallow( <Layout {...props} /> )
			navigationComponent = layout.find('Navigation')
			weatherComponent = layout.find('Weather')
			forecastsComponent = layout.find('Forecasts')
		})

		it('should render correct amount of elements with correct html tags', () => {
			expect(navigationComponent.length).toEqual(1)
			expect(weatherComponent.length).toEqual(1)
			expect(forecastsComponent.length).toEqual(1)

			expect(navigationComponent.type()).toEqual(Navigation)
			expect(weatherComponent.type()).toEqual(Weather)
			expect(forecastsComponent.type()).toEqual(Forecasts)
		})

		it('should set correct props for Navigation component', () => {
			const navigationComponentProps = navigationComponent.props()

			expect(navigationComponentProps.city).toEqual('Chicago')
			expect(navigationComponentProps.units).toEqual('C')
		})

		it('should set correct props for Weather component', () => {
			const weatherComponentProps = weatherComponent.props()

			expect(weatherComponentProps.weather).toEqual({
				rainy: true
			})
			expect(weatherComponentProps.units).toEqual('C')
			expect(weatherComponentProps.forecasts).toEqual({
				day: 'warm',
				night: 'cold'
			})
		})

		it('should set correct props for Forecasts component', () => {
			const forecastsComponentProps = forecastsComponent.props()

			expect(forecastsComponentProps.units).toEqual('C')
			expect(forecastsComponentProps.forecasts).toEqual([
				{
					degrees: 4
				},
				{
					degrees: 10
				}
			])
		})

		it(`should call props.dispatch and appropriate actions
			on component mount event when city is already set`, () => {
			expect(props.dispatch).toHaveBeenCalledTimes(3)

			expect(setCity).toHaveBeenCalledTimes(1)
			expect(setCity).toHaveBeenLastCalledWith('Chicago')

			expect(fetchWeather).toHaveBeenCalledTimes(1)
			expect(fetchWeather).toHaveBeenLastCalledWith('Chicago')

			expect(fetchForecast).toHaveBeenCalledTimes(1)
			expect(fetchForecast).toHaveBeenLastCalledWith('Chicago')
		})

		it(`should call props.dispatch and appropriate actions
			when calling unit change event on navigation component`, () => {
			navigationComponent.simulate('unitChange', true)

			expect(setTemperatureUnits).toHaveBeenCalledTimes(1)
			expect(setTemperatureUnits).toHaveBeenLastCalledWith(true)
			expect(props.dispatch).toHaveBeenCalledTimes(4)
		})

		it(`should call props.dispatch and appropriate actions
			when calling clear event on navigation component`, () => {
			navigationComponent.simulate('clear')

			expect(clearCity).toHaveBeenCalledTimes(1)
			expect(props.dispatch).toHaveBeenCalledTimes(4)
		})
	})

	describe('displayWeather is false', () => {
		it('should render correct amount of elements with correct html', () => {
			expect(layoutInner.length).toEqual(1)
			expect(searchComponent.length).toEqual(1)

			expect(layoutInner.type()).toEqual('div')
			expect(searchComponent.type()).toEqual(Search)
		})

		it('should set correct props for Search component', () => {
			expect(searchComponent.props().error).toEqual('weather error')
		})

		it(`should call props.dispatch and appropriate actions with city parameter
			when calling submit event on search component`, () => {
			searchComponent.simulate('submit', 'Viljandi')

			expect(props.dispatch).toHaveBeenCalledTimes(3)

			expect(setCity).toHaveBeenCalledTimes(1)
			expect(setCity).toHaveBeenLastCalledWith('Viljandi')

			expect(fetchWeather).toHaveBeenCalledTimes(1)
			expect(fetchWeather).toHaveBeenLastCalledWith('Viljandi')

			expect(fetchForecast).toHaveBeenCalledTimes(1)
			expect(fetchForecast).toHaveBeenLastCalledWith('Viljandi')
		})

		it(`should call props.dispatch and appropriate actions with city parameter
			when calling locationClick event on search component`, () => {
			layout.setProps({
				location: 'Tartu'
			})

			searchComponent.simulate('locationClick')

			expect(props.dispatch).toHaveBeenCalledTimes(4)
			expect(fetchLocation).toHaveBeenCalledTimes(1)

			expect(setCity).toHaveBeenCalledTimes(1)
			expect(setCity).toHaveBeenLastCalledWith('Tartu')

			expect(fetchWeather).toHaveBeenCalledTimes(1)
			expect(fetchWeather).toHaveBeenLastCalledWith('Tartu')

			expect(fetchForecast).toHaveBeenCalledTimes(1)
			expect(fetchForecast).toHaveBeenLastCalledWith('Tartu')
		})
	})
})
