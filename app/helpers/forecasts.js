/**
 * Method takes in a collection of forecasts and an additional forecast
 * and maps them to semantic values (morning, day, evening and night)
 * on the return object
 * @param {Object[]} todaysForecasts - collection of forecasts object
 * @param {Object} nightForecast - night forecast object
 * @return {Object} - semantically mapped daily forecast object
 */
export function parseForecasts(todaysForecasts, nightForecast) {
	const daysWeather = {}

	todaysForecasts.forEach(forecast => {
		const hours = forecast.hours
		
		if (hours > 7 && hours < 11) {
			daysWeather.morning = forecast
		}

		if (hours > 13 && hours < 17) {
			daysWeather.day = forecast
		}

		if (hours > 17 && hours < 23) {
			daysWeather.evening = forecast
		}
	})

	if (nightForecast.hours < 4) {
		daysWeather.night = nightForecast
	}

	return daysWeather
}