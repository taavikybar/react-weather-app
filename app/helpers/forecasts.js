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