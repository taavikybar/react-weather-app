/* global describe, it, beforeEach, expect, jest, afterEach */
/* eslint-disable no-unused-vars */

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

describe('Layout', () => {
	let layout,
		props,
		layoutInner,
		searchComponent,
		navigationComponent,
		weatherComponent,
		forecastsComponent

	beforeEach(() => {
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
	})

	it('should set correct class name and html tag for root element', () => {
		expect(layout.hasClass('layout')).toBeTruthy()
		expect(layout.type()).toEqual('div')
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

		it('should call props.dispatch and appropriate actions with city parameter when calling submit event on search component', () => {
			searchComponent.simulate('submit', 'Viljandi')

			expect(props.dispatch.mock.calls.length).toEqual(3)

			expect(setCity.mock.calls.length).toEqual(1)
			expect(setCity.mock.calls[0][0]).toEqual('Viljandi')

			expect(fetchWeather.mock.calls.length).toEqual(1)
			expect(fetchWeather.mock.calls[0][0]).toEqual('Viljandi')

			expect(fetchForecast.mock.calls.length).toEqual(1)
			expect(fetchForecast.mock.calls[0][0]).toEqual('Viljandi')
		})

		it('should call props.dispatch and appropriate actions with city parameter when calling locationClick event on search component', () => {
			layout.setProps({
				location: 'Tartu'
			})

			searchComponent.simulate('locationClick')

			expect(props.dispatch.mock.calls.length).toEqual(4)
			expect(fetchLocation.mock.calls.length).toEqual(1)

			expect(setCity.mock.calls.length).toEqual(1)
			expect(setCity.mock.calls[0][0]).toEqual('Tartu')

			expect(fetchWeather.mock.calls.length).toEqual(1)
			expect(fetchWeather.mock.calls[0][0]).toEqual('Tartu')

			expect(fetchForecast.mock.calls.length).toEqual(1)
			expect(fetchForecast.mock.calls[0][0]).toEqual('Tartu')
		})
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
	})
})
