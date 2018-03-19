export function setCity(city) {
	return {
		type: 'SET_CITY',
		payload: city
	}
}

export function clearCity() {
	return {
		type: 'CLEAR_CITY'
	}
}