export function setTemperatureUnits(toFahrenheit) {
	return {
		type: 'SET_TEMPERATURE_UNITS_TO_FAHRENHEIT',
		payload: toFahrenheit
	}
}