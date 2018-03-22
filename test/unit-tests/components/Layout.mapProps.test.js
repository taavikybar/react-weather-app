
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
				},
				error: 'location error'
			},
			units: 'C',
			weather: {
				weather: 'rainy',
				fetched: true,
				error: 'weather error'
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
				error: 'forecasts error',
				todaysForecasts: {
					day: 'warm',
					night: 'cold'
				}
			}
		}
	})

	it('', () => {
		const expectedProps = {
			city: 'Tallinn',
			location: 'Tartu',
			locationError: 'location error',
			units: 'C',
			weather: 'rainy',
			weatherFetched: true,
			weatherError: 'weather error',
			forecasts: [
				{
					degrees: 4
				},
				{
					degrees: 10
				}
			],
			forecastsFetched: true,
			forecastsError: 'forecasts error',
			todaysForecasts: {
				day: 'warm',
				night: 'cold'
			}
		}

		expect(mapProps(store)).toEqual(expectedProps)
	})
})