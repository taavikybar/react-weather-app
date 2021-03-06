/* Actions concerning current weather data */

import axios from 'axios'
import { weatherApi } from '../config'

export function fetchWeather(city) {
	return dispatch => dispatch({
		type: 'FETCH_WEATHER',
		payload: axios.get(`${weatherApi.url}weather?q=${city}&appid=${weatherApi.key}${weatherApi.options}`)
	}).catch(error => {
		dispatch({
			type: 'FETCH_WEATHER_ERROR',
			payload: error
		})
	})
}
