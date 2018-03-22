/* global describe, it, beforeEach, expect, afterEach */

import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import timemacine from 'timemachine'

import Weather from '../../../app/components/Weather'
import Forecast from '../../../app/components/Forecast'
import Icon from '../../../app/components/Icon'

Enzyme.configure({adapter: new Adapter()})

describe('Weather', () => {
	let weather,
		units,
		weatherData,
		forecasts,
		dateElem,
		descriptionElem,
		currentElem,
		currentDegreesElem,
		currentIconElem,
		iconComponent,
		forecastsElem,
		forecastsInnerElem,
		forecastsComponents

	beforeEach(() => {
		timemacine.config({
			dateString: 'December 25, 1991 13:12:59'
		})

		units = {
			symbol: 'C'
		}

		weatherData = {
			description: 'Cloudy',
			degrees: '10',
			id: 1
		}

		forecasts = {
			morning: {
				degrees: 8,
				id: 2
			},
			day: {
				degrees: 11,
				id: 3
			},
			evening: {
				degrees: 13,
				id: 4
			},
			night: {
				degrees: 4,
				id: 5
			}
		}

		weather = shallow(
			<Weather weather={weatherData}
				units={units}
				forecasts={forecasts}
			/>
		)

		dateElem = weather.find('.weather__date')
		descriptionElem = weather.find('.weather__description')
		currentElem = weather.find('.weather__current')
		currentDegreesElem = currentElem.find('.weather__current-degrees')
		currentIconElem = currentElem.find('.weather__current-icon')
		iconComponent = currentIconElem.find('Icon')
		forecastsElem = weather.find('.weather__forecasts')
		forecastsInnerElem = forecastsElem.find('.weather__forecasts-inner')
		forecastsComponents = forecastsElem.find('Forecast')
	})

	afterEach(() => {
		timemacine.reset()
	})

	it('should set correct class name and html tag for root element', () => {
		expect(weather.hasClass('weather')).toBeTruthy()
		expect(weather.type()).toEqual('div')
	})

	it('should render correct amount of elements with correct html tags', () => {
		expect(dateElem.length).toEqual(1)
		expect(descriptionElem.length).toEqual(1)
		expect(currentElem.length).toEqual(1)
		expect(currentDegreesElem.length).toEqual(1)
		expect(currentIconElem.length).toEqual(1)
		expect(iconComponent.length).toEqual(1)
		expect(forecastsElem.length).toEqual(1)
		expect(forecastsInnerElem.length).toEqual(1)
		expect(forecastsComponents.length).toEqual(4)

		expect(dateElem.type()).toEqual('div')
		expect(descriptionElem.type()).toEqual('div')
		expect(currentElem.type()).toEqual('div')
		expect(currentDegreesElem.type()).toEqual('div')
		expect(currentIconElem.type()).toEqual('div')
		expect(iconComponent.type()).toEqual(Icon)
		expect(forecastsElem.type()).toEqual('div')
		expect(forecastsInnerElem.type()).toEqual('div')
		expect(forecastsComponents.first().type()).toEqual(Forecast)
	})

	it('should set correct props for Moment component', () => {
		const dateElemChildrenProps = dateElem.children().props()

		expect(dateElemChildrenProps.format).toEqual('dddd, MMMM Do YYYY')
		expect(dateElemChildrenProps.date).toEqual(new Date())
	})

	it('should set correct content for current degrees element', () => {
		expect(currentDegreesElem.text()).toEqual('10°C')
	})

	it('should set correct props for current degrees element', () => {
		expect(iconComponent.props().code).toEqual(1)
	})

	describe('Weather forecasts', () => {
		it('should set correct props for forecasts elements if all elements are rendered', () => {
			const morningForecast = forecastsComponents.at(0),
				dayForecast = forecastsComponents.at(1),
				eveningForecast = forecastsComponents.at(2),
				nightForecast = forecastsComponents.at(3),
				expectedMorningProps = {
					title: 'Morning',
					degrees: 8,
					units: {
						symbol: 'C'
					}, 
					code: 2
				},
				expectedDayProps = {
					title: 'Day',
					degrees: 11,
					units: {
						symbol: 'C'
					},
					code: 3
				},
				expectedEveningProps = {
					title: 'Evening',
					degrees: 13,
					units: {
						symbol: 'C'
					},
					code: 4
				},
				expectedNightProps = {
					title: 'Night',
					degrees: 4,
					units: {
						symbol: 'C'
					},
					code: 5
				}

			expect(morningForecast.props()).toEqual(expectedMorningProps)
			expect(dayForecast.props()).toEqual(expectedDayProps)
			expect(eveningForecast.props()).toEqual(expectedEveningProps)
			expect(nightForecast.props()).toEqual(expectedNightProps)
		})

		it('should not render forecasts elements if they are not provided', () => {
			weather = shallow(
				<Weather weather={weatherData}
					units={units}
					forecasts={{}}
				/>
			)
			forecastsComponents = weather.find('Forecast')
			
			expect(forecastsComponents.length).toEqual(0)
		})

		it('should render only provided forecast element with corrent props set', () => {
			forecasts = {
				night: {
					degrees: 13,
					id: 4
				}
			}
			units = {
				symbol: 'F'
			}
			weather = shallow(
				<Weather weather={weatherData}
					units={units}
					forecasts={forecasts}
				/>
			)

			const forecastsComponent = weather.find('Forecast'),
				expectedProps = {
					title: 'Night',
					degrees: 13,
					units: {
						symbol: 'F'
					},
					code: 4
				}

			expect(forecastsComponent.props()).toEqual(expectedProps)
		})
	})
})
