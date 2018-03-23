/* Reducer for actions concerning fetching errors */

import { capitalize } from '../utils'

export default function reducer(state = {
	error: null
}, action) {
	const { type, payload } = action

	switch (type) {
		case 'FETCH_LOCATION_ERROR': {
			return {
				...state,
				error:  payload.response && payload.response.data
				? capitalize(payload.response.data.message) : 'Location fetching error'
			}
		}

		case 'FETCH_FORECAST_ERROR': {
			return {
				...state,
				error: capitalize(payload.response.data.message)
			}
		}

		case 'FETCH_WEATHER_ERROR': {
			return {
				...state,
				error: capitalize(payload.response.data.message)
			}
		}
	}

	return state
}