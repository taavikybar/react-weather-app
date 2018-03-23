
/* Reducer for actions concerning weather data */

import { capitalize } from '../utils'

export default function reducer(state = {
	weather: {
		description: '',
		degrees: null
	},
	fetched: false,
	error: null
}, action) {
	const { type, payload } = action,
		data = payload && payload.data

	switch (type) {
		case 'FETCH_WEATHER_FULFILLED': {
			const description = capitalize(data.weather[0].description),
				degrees = data.main.temp,
				id = data.weather[0].id

			return {
				...state,
				weather: {
					description,
					degrees,
					id
				},
				fetched: true,
				error: null
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