
/* Reducer for actions concerning temperature units data */

export default function reducer(state = {
	name: 'celsius',
	symbol: 'C'
}, action) {
	const { type, payload } = action

	switch (type) {
		case 'SET_TEMPERATURE_UNITS_TO_FAHRENHEIT': {
			if (payload) {
				return {
					...state,
					name: 'fahrenheit',
					symbol: 'F'
				}
			} else {
				return {
					...state,
					name: 'celsius',
					symbol: 'C'
				}
			}
		}
	}

	return state
}