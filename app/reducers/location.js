
/* Reducer for actions concerning location data */

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

	let error = null

	switch (type) {
		case 'FETCH_LOCATION_FULFILLED': {
			return {
				...state,
				location: data,
				fetched: true,
				error
			}
		}
	}

	return state
}