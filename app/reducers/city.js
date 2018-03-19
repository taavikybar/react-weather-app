export default function reducer(state = {
	city: ''
}, action) {
	const { type, payload } = action

	switch (type) {
		case 'SET_CITY': {
			return {
				...state,
				city: payload
			}
		}

		case 'CLEAR_CITY': {
			return {
				...state,
				city: ''
			}
		}
	}

	return state
}