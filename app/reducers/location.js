
/* Reducer for actions concerning location data */

import { capitalize } from '../utils'

export default function reducer(state = {
	location: {
		location: {
			city: ''
		}
	},
	fetched: false,
	error: null
}, action) {
	const { type, payload } = action,
		data = payload && payload.data

	switch (type) {
		case 'FETCH_LOCATION_FULFILLED': {
			return {
				...state,
				location: data,
				fetched: true,
				error: null
			}
		}

		case 'FETCH_LOCATION_REJECTED': {
			return {
				...state,
				error: payload.response && payload.response.data
					? capitalize(payload.response.data.message) : 'Location fetching error'
			}
		}
	}

	return state
}