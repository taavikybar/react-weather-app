
/* Reducer for actions concerning weather forecasts data */

import moment from 'moment'
import { capitalize } from '../utils'
import { parseForecasts } from '../helpers/forecasts'

export default function reducer(state = {
	forecasts: [],
	todaysForecasts: {},
	fetched: false,
	error: null
}, action) {
	const { type, payload } = action,
		data = payload && payload.data

	switch (type) {
		case 'FETCH_FORECAST_FULFILLED': {
			const tomorrow = moment().startOf('day').add(1, 'days'),
				forecastsList = [],
				forecastsRetrieved = data.list

			let todaysForecasts = []

			forecastsRetrieved.forEach(forecast => {
				const timestamp = forecast.dt,
					momentDate = moment.unix(timestamp), // In browser timezone
					date = momentDate.format('DD-MM'),
					day = momentDate.format('dddd'),
					hours = momentDate.hours(),
					forecastObj = {
						hours,
						id: forecast.weather[0].id,
						degrees: Math.floor(forecast.main.temp)
					},
					forecastIndex = forecastsList.findIndex(forecastInCollection => forecastInCollection.date === date)

				/* Exclude today */
				if (momentDate < tomorrow) {
					todaysForecasts.push(forecastObj)
					return
				}

				if (forecastsList[forecastIndex] && forecastsList[forecastIndex].forecasts) {
					forecastsList[forecastIndex].forecasts.push(forecastObj)
				} else {
					forecastsList.push({
						date,
						day,
						forecasts: [
							forecastObj
						]
					})
				}
			})

			/* Parse todays forecasts */
			todaysForecasts = parseForecasts(todaysForecasts, forecastsList[0].forecasts[0])

			return {
				...state,
				todaysForecasts,
				forecasts: forecastsList,
				fetched: true,
				error: null
			}
		}

		case 'FETCH_FORECASTS_REJECTED': {
			return {
				...state,
				error: capitalize(payload.response.data.message)
			}
		}

		case 'CLEAR_CITY': {
			return {
				...state,
				fetched: false
			}
		}
	}

	return state
}