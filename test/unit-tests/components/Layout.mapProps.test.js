
/* global describe, it, beforeEach, expect */

import { mapProps } from '../../../app/components/Layout'

describe('mapProps', () => {
	let store

	beforeEach(() => {
		store = {
			city: {
				city: 'Tallinn'
			},
			location: {
				location: {
					city: 'Tartu'
				}
			},
			units: 'C',
			weather: {
				weather: 'rainy',
				fetched: true
			},
			forecasts: {
				forecasts: [
					{
						degrees: 4
					},
					{
						degrees: 10
					}
				],
				fetched: true,
				todaysForecasts: {
					day: 'warm',
					night: 'cold'
				}
			},
			error: {
				error: 'Fetching error'
			}
		}
	})

	it('should return correct props', () => {
		const expectedProps = {
			city: 'Tallinn',
			location: 'Tartu',
			units: 'C',
			weather: 'rainy',
			weatherFetched: true,
			forecasts: [
				{
					degrees: 4
				},
				{
					degrees: 10
				}
			],
			forecastsFetched: true,
			todaysForecasts: {
				day: 'warm',
				night: 'cold'
			},
			error: 'Fetching error'
		}

		expect(mapProps(store)).toEqual(expectedProps)
	})
})